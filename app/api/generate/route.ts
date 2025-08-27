import { NextRequest, NextResponse } from "next/server";
import { anthropic, CLAUDE_MODEL } from "@/lib/anthropic";
import { GenerationSchema, BasePropsSchema, MemeCoinPropsSchema, AppLandingPropsSchema, StepWizardPropsSchema, LandingTemplatePropsSchema } from "@/lib/templates";
import { slugify, nano } from "@/lib/slug";
import { saveSite } from "@/lib/store";

// Allowed templateId values
const ALLOWED_TEMPLATES = [
  "memeCoin",
  "appLanding", 
  "stepWizard",
  "minimalDocs",
  "landingTemplate"
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body; // Extract prompt directly from body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
    }

    console.log('🚀 Starting generation for prompt:', prompt);

    // Generate AI-based title and icon
    const titleAndIcon = await generateTitleAndIcon(prompt);
    console.log('✅ Generated title and icon:', titleAndIcon);
    
    // Determine template based on prompt content
    const templateId = determineTemplate(prompt);
    console.log('🎯 Selected template:', templateId);
    
    // Generate props based on template
    const props = await generateProps(prompt, templateId, titleAndIcon);
    console.log('⚙️ Generated props:', props);
    
    // Create slug
    const slug = slugify(titleAndIcon.title) + "-" + nano();
    
    // Save to store
    const siteData = {
      templateId,
      props,
      prompt,
      createdAt: new Date().toISOString(),
      title: titleAndIcon.title,
      icon: titleAndIcon.icon
    };
    
    await saveSite(slug, siteData);
    console.log('💾 Saved site with slug:', slug);
    
    return NextResponse.json({ 
      slug, 
      templateId, 
      props,
      title: titleAndIcon.title,
      icon: titleAndIcon.icon
    });
    
  } catch (error) {
    console.error('❌ Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate website' }, 
      { status: 500 }
    );
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
    const allTemplates = ["memeCoin", "appLanding", "stepWizard", "minimalDocs", "landingTemplate", "cardGrid", "timeline", "magazine"];
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
      max_tokens: 1000,
      temperature: 0.8,
      messages: [
        {
          role: "user",
          content: `You are an expert website content creator. Generate engaging, relevant content for this website prompt: "${prompt}"

Template: ${templateId}
Title: ${titleAndIcon.title}
Icon: ${titleAndIcon.icon}

IMPORTANT: The content must be highly relevant to the user's prompt. If they ask for a school website, create school-specific content. If they ask for a restaurant, create restaurant-specific content. Make it feel like a real, professional website.

Generate props in this exact JSON format for ${templateId}:

${getTemplateSchema(templateId, titleAndIcon)}

Guidelines:
- Make the subtitle specific and relevant to the prompt
- Create realistic badges that make sense for the business/website type
- Generate features that are actually useful for the specific use case
- Use appropriate CTA text for the business type
- Make everything feel authentic and professional

Example: If someone asks for a "pizza restaurant website", don't give generic "Feature 1, Feature 2" - give them "Fresh Ingredients", "Fast Delivery", "Family Recipes", etc.

CRITICAL: Respond with ONLY the JSON object. Do not add any explanatory text before or after the JSON.`
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
          return parsed;
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

function getTemplateSchema(templateId: string, titleAndIcon: { title: string, icon: string }): string {
  switch (templateId) {
    case "memeCoin":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "A compelling subtitle for the meme coin",
        "bullets": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        "ctaText": "Get Started",
        "ticker": "COIN",
        "supply": "1,000,000,000"
      }`;
    case "appLanding":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "A compelling subtitle that describes the app",
        "badges": ["Badge 1", "Badge 2", "Badge 3"],
        "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        "showcaseTitle": "Key Features",
        "ctaPrimary": "Get Started",
        "ctaSecondary": "Learn More"
      }`;
    case "stepWizard":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "A clear subtitle explaining the step-by-step process",
        "steps": [
          {"title": "Step 1", "desc": "Description of step 1"},
          {"title": "Step 2", "desc": "Description of step 2"},
          {"title": "Step 3", "desc": "Description of step 3"}
        ],
        "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
        "ctaPrimary": "Get Started",
        "disclaimer": "Important information about the process"
      }`;
    case "minimalDocs":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Documentation subtitle explaining the content",
        "bullets": ["Key Point 1", "Key Point 2", "Key Point 3", "Key Point 4"],
        "ctaText": "Get Started"
      }`;
    case "landingTemplate":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "A compelling subtitle that describes the product/service",
        "badges": ["Badge 1", "Badge 2", "Badge 3"],
        "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        "showcaseTitle": "Why Choose Us",
        "ctaPrimary": "Get Started",
        "ctaSecondary": "Learn More",
        "colorScheme": "trendy"
      }`;
    default:
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Default subtitle"
      }`;
  }
}

function getFallbackProps(templateId: string, titleAndIcon: { title: string, icon: string }) {
  // Add some randomness to fallback props
  const randomFeatures = [
    ["Innovative", "Reliable", "Fast", "Secure"],
    ["Professional", "Creative", "Efficient", "Modern"],
    ["Quality", "Trusted", "Advanced", "User-friendly"],
    ["Cutting-edge", "Premium", "Scalable", "Intuitive"]
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
  
  const randomIndex = Math.floor(Math.random() * 4);
  
  switch (templateId) {
    case "memeCoin":
      return {
        title: titleAndIcon.title,
        subtitle: "The next big thing in crypto",
        bullets: ["Community Driven", "Transparent", "Innovative", "High Potential"],
        ctaText: "Get Started",
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
        ctaPrimary: "Get Started",
        ctaSecondary: "Learn More"
      };
    case "stepWizard":
      return {
        title: titleAndIcon.title,
        subtitle: "Follow these simple steps to success",
        steps: [
          {title: "Step 1", desc: "Get started with the basics"},
          {title: "Step 2", desc: "Configure your settings"},
          {title: "Step 3", desc: "Launch and enjoy"}
        ],
        highlights: ["Easy to follow", "Proven method", "Quick results"],
        ctaPrimary: "Get Started",
        disclaimer: "Results may vary based on individual circumstances"
      };
    case "minimalDocs":
      return {
        title: titleAndIcon.title,
        subtitle: "Complete documentation and guides",
        bullets: ["Getting Started", "Advanced Features", "Best Practices", "Troubleshooting"],
        ctaText: "Get Started"
      };
    case "landingTemplate":
      return {
        title: titleAndIcon.title,
        subtitle: randomSubtitles[randomIndex],
        badges: randomBadges[randomIndex],
        features: randomFeatures[randomIndex],
        showcaseTitle: "Why Choose Us",
        ctaPrimary: "Get Started",
        ctaSecondary: "Learn More",
        colorScheme: "random"
      };
    default:
      return {
        title: titleAndIcon.title,
        subtitle: randomSubtitles[randomIndex]
      };
  }
}
