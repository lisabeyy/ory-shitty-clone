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
- Tech startup: "InnovateTech Solutions" + 💡`
        }
      ]
    });

    const content = response.content[0];
    if (content.type === "text") {
      console.log('📝 Claude title/icon response:', content.text);
      try {
        const parsed = JSON.parse(content.text);
        console.log('✅ Successfully parsed title/icon:', parsed);
        return {
          title: parsed.title || "Amazing Website",
          icon: parsed.icon || "✨"
        };
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
  
  if (lowerPrompt.includes('meme') || lowerPrompt.includes('coin') || lowerPrompt.includes('token')) {
    return "memeCoin";
  } else if (lowerPrompt.includes('app') || lowerPrompt.includes('landing') || lowerPrompt.includes('product')) {
    return "appLanding";
  } else if (lowerPrompt.includes('step') || lowerPrompt.includes('wizard') || lowerPrompt.includes('guide')) {
    return "stepWizard";
  } else if (lowerPrompt.includes('doc') || lowerPrompt.includes('documentation') || lowerPrompt.includes('api')) {
    return "minimalDocs";
  } else {
    return "landingTemplate";
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

Example: If someone asks for a "pizza restaurant website", don't give generic "Feature 1, Feature 2" - give them "Fresh Ingredients", "Fast Delivery", "Family Recipes", etc.`
        }
      ]
    });

    const content = response.content[0];
    if (content.type === "text") {
      console.log('📝 Claude response:', content.text);
      try {
        const parsed = JSON.parse(content.text);
        console.log('✅ Successfully parsed props:', parsed);
        return parsed;
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
  switch (templateId) {
    case "memeCoin":
      return {
        title: titleAndIcon.title,
        subtitle: "The next big thing in crypto",
        ticker: "COIN",
        description: "A revolutionary meme coin that's taking the world by storm",
        features: ["Community Driven", "Transparent", "Innovative"],
        socialLinks: ["Twitter", "Telegram", "Discord"]
      };
    case "appLanding":
      return {
        title: titleAndIcon.title,
        subtitle: "Revolutionary app that changes everything",
        description: "Experience the future with our cutting-edge application",
        badges: ["New", "Trending"],
        features: ["Fast", "Secure", "User-friendly"],
        ctaText: "Get Started",
        secondaryCta: "Learn More"
      };
    case "stepWizard":
      return {
        title: titleAndIcon.title,
        subtitle: "Follow these simple steps to success",
        steps: [
          {title: "Step 1", description: "Get started with the basics"},
          {title: "Step 2", description: "Configure your settings"},
          {title: "Step 3", description: "Launch and enjoy"}
        ]
      };
    case "minimalDocs":
      return {
        title: titleAndIcon.title,
        subtitle: "Complete documentation and guides",
        sections: [
          {title: "Getting Started", content: "Learn the basics quickly"},
          {title: "Advanced Features", content: "Master advanced functionality"}
        ]
      };
    case "landingTemplate":
      return {
        title: titleAndIcon.title,
        subtitle: "Amazing product that solves real problems",
        badges: ["Featured", "Popular"],
        features: ["Innovative", "Reliable", "Fast"],
        showcaseTitle: "Why Choose Us",
        ctaPrimary: "Get Started",
        ctaSecondary: "Learn More"
      };
    default:
      return {
        title: titleAndIcon.title,
        subtitle: "Amazing website created just for you"
      };
  }
}
