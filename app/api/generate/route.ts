import { NextRequest, NextResponse } from "next/server";
import { anthropic, CLAUDE_MODEL } from "@/lib/anthropic";
import { GenerationSchema, BasePropsSchema, MemeCoinPropsSchema, AppLandingPropsSchema, StepWizardPropsSchema } from "@/lib/templates";
import { slugify, nano } from "@/lib/slug";
import { saveSite } from "@/lib/store";
import { generateRandomStyleParams } from "@/lib/consistentStyles";

// Allowed templateId values
const ALLOWED_TEMPLATES = [
  "memeCoin",
  "appLanding", 
  "stepWizard",
  "minimalDocs",
  "landingTemplate"
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body; // Extract prompt directly from body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
    }

    console.log('🚀 Starting generation for prompt:', prompt);

    // Generate title and icon first
    const titleAndIcon = await generateTitleAndIcon(prompt);
    console.log('✅ Generated title and icon:', titleAndIcon);

    // Determine template based on prompt
    const templateId = determineTemplate(prompt);
    console.log('🎨 Selected template:', templateId);

    // Generate props for the template
    const props = await generateProps(prompt, templateId, titleAndIcon);
    console.log('🔧 Generated props:', props);

    // Generate random style parameters that will be stored
    const styleParams = generateRandomStyleParams();
    console.log('🎨 Generated style parameters:', styleParams);

    // Add style parameters to props
    const propsWithStyles = {
      ...props,
      styleParams
    };

    // Generate slug
    const slug = slugify(titleAndIcon.title);
    console.log('🔗 Generated slug:', slug);

    // Save to database
    const siteData = {
      slug,
      title: titleAndIcon.title,
      icon: titleAndIcon.icon,
      templateId,
      props: propsWithStyles,
      createdAt: new Date().toISOString()
    };

    await saveSite(slug, siteData);
    console.log('💾 Saved site to database:', slug);

    return NextResponse.json({
      success: true,
      slug,
      url: `/website/${slug}`,
      data: siteData
    });

  } catch (error) {
    console.error('❌ Generation failed:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}

async function generateTitleAndIcon(prompt: string) {
  try {
    console.log('🎨 Sending prompt to Claude for title/icon generation...');
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 200,
      temperature: 0.8,
      messages: [
        {
          role: "user",
          content: `You are an expert at creating catchy, relevant website titles and choosing appropriate icons.

Based on this website prompt, generate a creative, catchy title (max 6 words) and choose the most appropriate emoji.

Prompt: "${prompt}"

IMPORTANT: The title must be highly relevant to the prompt. If they ask for a school website, create a school-appropriate title. If they ask for a restaurant, create a restaurant-appropriate title.

Respond in this exact JSON format:
{
  "title": "Creative Website Title",
  "icon": "🚀"
}

Guidelines:
- Make the title specific to the business/website type
- Choose an emoji that represents the business/website type
- For schools: use education-related emojis (🎓, 📚, 🏫)
- For restaurants: use food-related emojis (🍕, 🍔, 🍜)
- For businesses: use business-related emojis (💼, 🏢, 💡)
- For creative projects: use creative emojis (🎨, ✨, 🚀)

Examples:
- School website: "Excellence Academy" + 🎓
- Pizza restaurant: "Slice & Dice Pizza" + 🍕
- Tech startup: "InnovateTech Solutions" + 💡

CRITICAL: Respond with ONLY the JSON object. Do not add any explanatory text before or after the JSON.`
        }
      ]
    });

    const content = response.content[0];
    if (content.type === "text") {
      console.log('📝 Claude title/icon response:', content.text);
      try {
        // Extract JSON from the response (remove any explanatory text)
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          const parsed = JSON.parse(jsonString);
          console.log('✅ Successfully parsed title/icon:', parsed);
          return {
            title: parsed.title || "Amazing Website",
            icon: parsed.icon || "✨"
          };
        } else {
          console.error('❌ No JSON found in title/icon response');
        }
      } catch (parseError) {
        console.error('❌ Title/icon parsing failed:', parseError);
        console.error('Raw response:', content.text);
        return {
          title: "Amazing Website",
          icon: "✨"
        };
      }
    }
  } catch (error) {
    console.error('❌ Title/icon generation failed:', error);
  }
  
  console.log('🔄 Using fallback title/icon');
  // Fallback title and icon
  return {
    title: "Amazing Website",
    icon: "✨"
  };
}

function determineTemplate(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  // Sometimes randomly select a template for variety (20% chance)
  if (Math.random() < 0.2) {
    const allTemplates = ["memeCoin", "appLanding", "stepWizard", "minimalDocs", "landingTemplate", "cardGrid", "timeline", "magazine", "bubbleClickerShell"];
    return allTemplates[Math.floor(Math.random() * allTemplates.length)];
  }
  
  // Otherwise, use logic-based selection
  if (lowerPrompt.includes('meme') || lowerPrompt.includes('coin') || lowerPrompt.includes('token')) {
    return "memeCoin";
  } else if (lowerPrompt.includes('app') || lowerPrompt.includes('landing') || lowerPrompt.includes('product')) {
    return "appLanding";
  } else if (lowerPrompt.includes('step') || lowerPrompt.includes('wizard') || lowerPrompt.includes('guide')) {
    return "stepWizard";
  } else if (lowerPrompt.includes('doc') || lowerPrompt.includes('documentation') || lowerPrompt.includes('api')) {
    return "minimalDocs";
  } else if (lowerPrompt.includes('game') || lowerPrompt.includes('clicker') || lowerPrompt.includes('bubble')) {
    return "bubbleClickerShell";
  } else {
    // Randomly select from modern templates for variety
    const modernTemplates = ["landingTemplate", "cardGrid", "timeline", "magazine"];
    return modernTemplates[Math.floor(Math.random() * modernTemplates.length)];
  }
}

async function generateProps(prompt: string, templateId: string, titleAndIcon: { title: string, icon: string }) {
  try {
    console.log('🤖 Sending prompt to Claude for props generation...');
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      temperature: 0.9,
      messages: [
        {
          role: "user",
          content: `You are an expert website content creator. Generate engaging, relevant content for this website prompt: "${prompt}"

Template: ${templateId}
Title: ${titleAndIcon.title}
Icon: ${titleAndIcon.icon}

CRITICAL INSTRUCTION: Generate ACTUAL content, NOT instructions or placeholders.

EXAMPLES OF WHAT TO GENERATE:
- For a "pizza restaurant website": 
  * subtitle: "Authentic Italian flavors delivered to your door"
  * features: ["Fresh Ingredients", "Fast Delivery", "Family Recipes", "Authentic Taste"]
  * badges: ["Popular", "Fast Delivery", "Family Owned"]

- For a "school website":
  * subtitle: "Empowering students with innovative learning experiences"
  * features: ["Academic Excellence", "Student Success", "Innovative Learning", "Community Focus"]
  * badges: ["Excellence", "Innovation", "Community"]

- For a "tech startup":
  * subtitle: "Revolutionary AI solutions for modern businesses"
  * features: ["AI-Powered Solutions", "Scalable Architecture", "24/7 Support", "Cutting-Edge Innovation"]
  * badges: ["Innovation", "AI-Powered", "Enterprise Ready"]

Generate props in this exact JSON format for ${templateId}:

${getTemplateSchema(templateId, titleAndIcon)}

RULES:
1. NEVER use text like "Generate feature names" or "Feature 1" - create REAL content
2. Make everything highly relevant to the user's prompt
3. Use professional, engaging language
4. Create authentic business-specific content

CRITICAL: Respond with ONLY the JSON object. Do not add any explanatory text.`
        }
      ]
    });

    const content = response.content[0];
    if (content.type === "text") {
      console.log('📝 Claude response:', content.text);
      try {
        // Extract JSON from the response (remove any explanatory text)
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          const parsed = JSON.parse(jsonString);
          console.log('✅ Successfully parsed props:', parsed);
          
          // Post-process to replace any instruction text with actual content
          const processed = postProcessProps(parsed, prompt, templateId);
          console.log('🔧 Post-processed props:', processed);
          
          return processed;
        } else {
          console.error('❌ No JSON found in response');
        }
      } catch (parseError) {
        console.error('❌ Props parsing failed:', parseError);
        console.error('Raw response:', content.text);
      }
    }
  } catch (error) {
    console.error('❌ Props generation failed:', error);
  }
  
  console.log('🔄 Using fallback props for template:', templateId);
  // Fallback props
  return getFallbackProps(templateId, titleAndIcon);
}

function postProcessProps(props: any, prompt: string, templateId: string): any {
  const processed = { ...props };
  
  // Replace any instruction text with actual content based on the prompt
  const lowerPrompt = prompt.toLowerCase();
  
  // Generate business-specific content based on prompt keywords
  const businessType = getBusinessType(lowerPrompt);
  const businessContent = getBusinessContent(businessType);
  
  // Process arrays (features, bullets, badges, etc.)
  Object.keys(processed).forEach(key => {
    if (Array.isArray(processed[key])) {
      processed[key] = processed[key].map((item: string) => {
        if (typeof item === 'string' && (
          item.includes('Generate') || 
          item.includes('Feature 1') || 
          item.includes('Badge 1') ||
          item.includes('Step 1') ||
          item.includes('Key Point 1')
        )) {
          // Replace instruction text with actual business content
          return businessContent.features[Math.floor(Math.random() * businessContent.features.length)];
        }
        return item;
      });
    }
  });
  
  // Process other fields
  if (processed.subtitle && processed.subtitle.includes('Generate')) {
    processed.subtitle = businessContent.subtitle;
  }
  
  if (processed.ctaText && processed.ctaText.includes('Generate')) {
    processed.ctaText = businessContent.cta;
  }
  
  if (processed.ctaPrimary && processed.ctaPrimary.includes('Generate')) {
    processed.ctaPrimary = businessContent.cta;
  }
  
  if (processed.ctaSecondary && processed.ctaSecondary.includes('Generate')) {
    processed.ctaSecondary = businessContent.ctaSecondary;
  }
  
  return processed;
}

function getBusinessType(prompt: string): string {
  if (prompt.includes('restaurant') || prompt.includes('food') || prompt.includes('pizza') || prompt.includes('cafe')) {
    return 'restaurant';
  } else if (prompt.includes('school') || prompt.includes('education') || prompt.includes('university') || prompt.includes('college')) {
    return 'education';
  } else if (prompt.includes('tech') || prompt.includes('startup') || prompt.includes('software') || prompt.includes('app')) {
    return 'tech';
  } else if (prompt.includes('health') || prompt.includes('medical') || prompt.includes('fitness') || prompt.includes('wellness')) {
    return 'health';
  } else if (prompt.includes('finance') || prompt.includes('bank') || prompt.includes('investment') || prompt.includes('crypto')) {
    return 'finance';
  } else {
    return 'general';
  }
}

function getBusinessContent(businessType: string) {
  const contentMap: Record<string, any> = {
    restaurant: {
      subtitle: "Delicious food delivered with excellence",
      features: ["Fresh Ingredients", "Fast Delivery", "Family Recipes", "Authentic Taste", "Quality Service", "Local Favorites"],
      cta: "Order Now",
      ctaSecondary: "View Menu"
    },
    education: {
      subtitle: "Empowering students with innovative learning experiences",
      features: ["Academic Excellence", "Student Success", "Innovative Learning", "Community Focus", "Expert Faculty", "Modern Facilities"],
      cta: "Apply Now",
      ctaSecondary: "Learn More"
    },
    tech: {
      subtitle: "Revolutionary solutions for modern businesses",
      features: ["AI-Powered Solutions", "Scalable Architecture", "24/7 Support", "Cutting-Edge Innovation", "Enterprise Ready", "User-Friendly Design"],
      cta: "Get Started",
      ctaSecondary: "Learn More"
    },
    health: {
      subtitle: "Your health and wellness is our priority",
      features: ["Expert Care", "Modern Facilities", "Personalized Treatment", "24/7 Support", "Professional Staff", "Advanced Technology"],
      cta: "Book Appointment",
      ctaSecondary: "Learn More"
    },
    finance: {
      subtitle: "Secure and smart financial solutions",
      features: ["Secure Platform", "Expert Advice", "Fast Transactions", "24/7 Support", "Competitive Rates", "User-Friendly Interface"],
      cta: "Get Started",
      ctaSecondary: "Learn More"
    },
    general: {
      subtitle: "Professional service that exceeds expectations",
      features: ["Quality Service", "Expert Team", "Innovative Solutions", "Customer Focus", "Reliable Performance", "Modern Approach"],
      cta: "Get Started",
      ctaSecondary: "Learn More"
    }
  };
  
  return contentMap[businessType] || contentMap.general;
}

function getTemplateSchema(templateId: string, titleAndIcon: { title: string, icon: string }): string {
  switch (templateId) {
    case "memeCoin":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate a compelling subtitle for this meme coin based on the prompt",
        "bullets": ["Generate 4 specific features for this meme coin", "Make them relevant to the prompt", "Use actual feature names, not 'Feature 1'", "Be creative and specific"],
        "ctaText": "Generate appropriate CTA text for this meme coin",
        "ticker": "Generate a 3-5 letter ticker symbol",
        "supply": "Generate a realistic token supply number"
      }`;
    case "appLanding":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate a compelling subtitle that describes the app based on the prompt",
        "badges": ["Generate 3 specific badges", "Make them relevant to the business type", "Use actual badge names, not 'Badge 1'"],
        "features": ["Generate 4 specific features", "Make them relevant to the business type", "Use actual feature names, not 'Feature 1'", "Be creative and specific"],
        "showcaseTitle": "Generate a relevant showcase title",
        "ctaPrimary": "Generate primary CTA text",
        "ctaSecondary": "Generate secondary CTA text"
      }`;
    case "stepWizard":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate a clear subtitle explaining the step-by-step process based on the prompt",
        "steps": [
          {"title": "Generate step 1 title", "desc": "Generate step 1 description"},
          {"title": "Generate step 2 title", "desc": "Generate step 2 description"},
          {"title": "Generate step 3 title", "desc": "Generate step 3 description"}
        ],
        "highlights": ["Generate 3 specific highlights", "Make them relevant to the process", "Use actual highlight names"],
        "ctaPrimary": "Generate primary CTA text",
        "disclaimer": "Generate relevant disclaimer text"
      }`;
    case "minimalDocs":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate documentation subtitle explaining the content based on the prompt",
        "bullets": ["Generate 4 specific key points", "Make them relevant to the documentation", "Use actual point names, not 'Key Point 1'", "Be creative and specific"],
        "ctaText": "Generate appropriate CTA text"
      }`;
    case "landingTemplate":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate a compelling subtitle that describes the product/service based on the prompt",
        "badges": ["Generate 3 specific badges", "Make them relevant to the business type", "Use actual badge names, not 'Badge 1'"],
        "features": ["Generate 4 specific features", "Make them relevant to the business type", "Use actual feature names, not 'Feature 1'", "Be creative and specific"],
        "showcaseTitle": "Generate a relevant showcase title",
        "ctaPrimary": "Generate primary CTA text",
        "ctaSecondary": "Generate secondary CTA text",
        "colorScheme": "trendy"
      }`;
    case "cardGrid":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate a compelling subtitle that describes the product/service based on the prompt",
        "bullets": ["Generate 4-6 specific features", "Make them relevant to the business type", "Use actual feature names, not 'Feature 1'", "Be creative and specific", "Make them sound professional"],
        "ctaText": "Generate appropriate CTA text"
      }`;
    case "timeline":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate a compelling subtitle that describes the process based on the prompt",
        "bullets": ["Generate 4-6 specific steps", "Make them relevant to the business type", "Use actual step names, not 'Step 1'", "Be creative and specific", "Make them sound professional"],
        "ctaText": "Generate appropriate CTA text"
      }`;
    case "magazine":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate a compelling subtitle that describes the content based on the prompt",
        "bullets": ["Generate 4-6 specific articles/updates", "Make them relevant to the business type", "Use actual article names, not 'Article 1'", "Be creative and specific", "Make them sound professional"],
        "ctaText": "Generate appropriate CTA text"
      }`;
    case "bubbleClickerShell":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate a compelling subtitle that describes the game based on the prompt",
        "bullets": ["Generate 4-6 specific features", "Make them relevant to the game type", "Use actual feature names, not 'Feature 1'", "Be creative and specific", "Make them sound professional"],
        "ctaText": "Generate appropriate CTA text"
      }`;
    default:
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Generate a subtitle based on the prompt"
      }`;
  }
}

function getFallbackProps(templateId: string, titleAndIcon: { title: string, icon: string }) {
  // Add some randomness to fallback props
  const randomFeatures = [
    ["Innovative Solutions", "Reliable Performance", "Fast Response", "Secure Platform"],
    ["Professional Service", "Creative Design", "Efficient Workflow", "Modern Technology"],
    ["Quality Assurance", "Trusted Partner", "Advanced Features", "User-Friendly Interface"],
    ["Cutting-Edge Innovation", "Premium Experience", "Scalable Architecture", "Intuitive Design"]
  ];
  
  const randomBadges = [
    ["Featured", "Popular", "Trending"],
    ["New", "Hot", "Recommended"],
    ["Premium", "Exclusive", "Limited"],
    ["Verified", "Trusted", "Award-winning"]
  ];
  
  const randomSubtitles = [
    "Revolutionary solution that transforms your experience",
    "Cutting-edge innovation that sets new standards",
    "Professional service that exceeds expectations",
    "Creative approach that delivers exceptional results"
  ];

  const randomCTAs = [
    "Get Started", "Begin Now", "Start Today", "Launch Now",
    "Get Started", "Learn More", "Explore Now", "Discover More"
  ];
  
  const randomIndex = Math.floor(Math.random() * 4);
  
  switch (templateId) {
    case "memeCoin":
      return {
        title: titleAndIcon.title,
        subtitle: "The next big thing in crypto",
        bullets: ["Community Driven", "Transparent", "Innovative", "High Potential"],
        ctaText: randomCTAs[randomIndex],
        ticker: "COIN",
        supply: "1,000,000,000"
      };
    case "appLanding":
      return {
        title: titleAndIcon.title,
        subtitle: randomSubtitles[randomIndex],
        badges: randomBadges[randomIndex],
        features: randomFeatures[randomIndex],
        showcaseTitle: "Key Features",
        ctaPrimary: randomCTAs[randomIndex],
        ctaSecondary: randomCTAs[randomIndex + 4]
      };
    case "stepWizard":
      return {
        title: titleAndIcon.title,
        subtitle: "Follow these simple steps to success",
        steps: [
          {title: "Get Started", desc: "Begin your journey with the basics"},
          {title: "Configure", desc: "Set up your preferences and settings"},
          {title: "Launch", desc: "Go live and start achieving results"}
        ],
        highlights: ["Easy to follow", "Proven method", "Quick results"],
        ctaPrimary: randomCTAs[randomIndex],
        disclaimer: "Results may vary based on individual circumstances"
      };
    case "minimalDocs":
      return {
        title: titleAndIcon.title,
        subtitle: "Complete documentation and guides",
        bullets: ["Getting Started", "Advanced Features", "Best Practices", "Troubleshooting"],
        ctaText: randomCTAs[randomIndex]
      };
    case "landingTemplate":
      return {
        title: titleAndIcon.title,
        subtitle: randomSubtitles[randomIndex],
        badges: randomBadges[randomIndex],
        features: randomFeatures[randomIndex],
        showcaseTitle: "Why Choose Us",
        ctaPrimary: randomCTAs[randomIndex],
        ctaSecondary: randomCTAs[randomIndex + 4],
        colorScheme: "random"
      };
    case "cardGrid":
      return {
        title: titleAndIcon.title,
        subtitle: randomSubtitles[randomIndex],
        bullets: randomFeatures[randomIndex],
        ctaText: randomCTAs[randomIndex]
      };
    case "timeline":
      return {
        title: titleAndIcon.title,
        subtitle: "Your journey to success starts here",
        bullets: ["Planning Phase", "Development", "Testing", "Launch", "Growth", "Scale"],
        ctaText: randomCTAs[randomIndex]
      };
    case "magazine":
      return {
        title: titleAndIcon.title,
        subtitle: "Stay updated with the latest insights",
        bullets: ["Industry Trends", "Expert Analysis", "Case Studies", "Best Practices", "Innovation News", "Success Stories"],
        ctaText: randomCTAs[randomIndex]
      };
    case "bubbleClickerShell":
      return {
        title: titleAndIcon.title,
        subtitle: randomSubtitles[randomIndex],
        bullets: randomFeatures[randomIndex],
        ctaText: randomCTAs[randomIndex]
      };
    default:
      return {
        title: titleAndIcon.title,
        subtitle: randomSubtitles[randomIndex]
      };
  }
}
