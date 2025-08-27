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

    // Generate AI-based title and icon
    const titleAndIcon = await generateTitleAndIcon(prompt);
    
    // Determine template based on prompt content
    const templateId = determineTemplate(prompt);
    
    // Generate props based on template
    const props = await generateProps(prompt, templateId, titleAndIcon);
    
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
    
    return NextResponse.json({ 
      slug, 
      templateId, 
      props,
      title: titleAndIcon.title,
      icon: titleAndIcon.icon
    });
    
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate website' }, 
      { status: 500 }
    );
  }
}

async function generateTitleAndIcon(prompt: string) {
  try {
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 150,
      temperature: 0.8,
      messages: [
        {
          role: "user",
          content: `Based on this website prompt, generate a creative, catchy title (max 6 words) and choose the most appropriate emoji or Lucide React icon name.

Prompt: "${prompt}"

Respond in this exact JSON format:
{
  "title": "Creative Website Title",
  "icon": "🚀" // or "zap" for Lucide React icons
}

Choose emojis for fun/creative sites, and Lucide React icon names for professional/business sites.`
        }
      ]
    });

    const content = response.content[0];
    if (content.type === "text") {
      try {
        const parsed = JSON.parse(content.text);
        return {
          title: parsed.title || "Amazing Website",
          icon: parsed.icon || "✨"
        };
      } catch {
        // Fallback if JSON parsing fails
        return {
          title: "Amazing Website",
          icon: "✨"
        };
      }
    }
  } catch (error) {
    console.error('Title/icon generation failed:', error);
  }
  
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
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1000,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: `Generate website props for this prompt: "${prompt}"

Template: ${templateId}
Title: ${titleAndIcon.title}
Icon: ${titleAndIcon.icon}

Generate props in this exact JSON format for ${templateId}:

${getTemplateSchema(templateId, titleAndIcon)}

Make it creative, engaging, and relevant to the prompt. Use the provided title and icon.`
        }
      ]
    });

    const content = response.content[0];
    if (content.type === "text") {
      try {
        const parsed = JSON.parse(content.text);
        return parsed;
      } catch {
        console.error('Props parsing failed, using fallback');
      }
    }
  } catch (error) {
    console.error('Props generation failed:', error);
  }
  
  // Fallback props
  return getFallbackProps(templateId, titleAndIcon);
}

function getTemplateSchema(templateId: string, titleAndIcon: { title: string, icon: string }): string {
  switch (templateId) {
    case "memeCoin":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "A fun and engaging description",
        "ticker": "COIN",
        "description": "Detailed description of the meme coin",
        "features": ["Feature 1", "Feature 2", "Feature 3"],
        "socialLinks": ["Twitter", "Telegram", "Discord"]
      }`;
    case "appLanding":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "A compelling subtitle",
        "description": "Detailed description",
        "badges": ["Badge 1", "Badge 2"],
        "features": ["Feature 1", "Feature 2", "Feature 3"],
        "ctaText": "Get Started",
        "secondaryCta": "Learn More"
      }`;
    case "stepWizard":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Step-by-step guide",
        "steps": [
          {"title": "Step 1", "description": "Description 1"},
          {"title": "Step 2", "description": "Description 2"},
          {"title": "Step 3", "description": "Description 3"}
        ]
      }`;
    case "minimalDocs":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Documentation subtitle",
        "sections": [
          {"title": "Section 1", "content": "Content 1"},
          {"title": "Section 2", "content": "Content 2"}
        ]
      }`;
    case "landingTemplate":
      return `{
        "title": "${titleAndIcon.title}",
        "subtitle": "Compelling subtitle",
        "badges": ["Badge 1", "Badge 2"],
        "features": ["Feature 1", "Feature 2", "Feature 3"],
        "showcaseTitle": "Showcase Title",
        "ctaPrimary": "Primary CTA",
        "ctaSecondary": "Secondary CTA"
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
