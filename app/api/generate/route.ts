import { NextRequest, NextResponse } from "next/server";
import { anthropic, CLAUDE_MODEL } from "@/lib/anthropic";
import { GenerationSchema, BasePropsSchema, MemeCoinPropsSchema, AppLandingPropsSchema, StepWizardPropsSchema, LandingTemplatePropsSchema } from "@/lib/templates";
import { slugify, nano } from "@/lib/slug";
import { saveSite } from "@/lib/store";

const SYSTEM = `You are a planner that maps a user prompt to a site template and props.

Output STRICT JSON ONLY with keys: templateId, slug, props.
Allowed templateId values: landingGradient, memeCoin, bubbleClickerShell, minimalDocs, appLanding, stepWizardBrief, landingTemplate.

Rules:
- slug: short, URL-safe kebab-case based on the idea; append a short random suffix if needed.
- props must match the template:
  - landingGradient: { title, subtitle, bullets[], ctaText }
  - memeCoin: { title, subtitle, bullets[], ctaText, ticker, supply }
  - bubbleClickerShell: { title, subtitle }
  - minimalDocs: { title, subtitle, bullets[] }
  - appLanding: { title, subtitle, badges[], features[], showcaseTitle, ctaPrimary, ctaSecondary }
  - stepWizardBrief: { title, subtitle, steps[{title, desc}], highlights[], ctaPrimary, disclaimer }
  - landingTemplate: { title, subtitle, badges[], features[], showcaseTitle, ctaPrimary, ctaSecondary, colorScheme (optional: cool/degen/cyberpunk/trendy/sport/random) }
- Keep text concise and non-cringe.
- If user mentions meme coin, token, ticker => prefer memeCoin.
- If user mentions game/clicker => bubbleClickerShell.
- If user asks for docs/tutorial => minimalDocs.
- If user describes an app/product/dashboard/stream => appLanding.
- If user asks for a creation flow or steps => stepWizardBrief.
- If user wants a modern landing page with features/badges => landingTemplate.
- Otherwise default to landingGradient.`;

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY" }, { status: 500 });
  }
  const { prompt } = await req.json();
  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
  }

  const msg = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 512,
    temperature: 0.4,
    system: SYSTEM,
    messages: [
      { role: 'user', content: prompt }
    ],
  });

  const text = msg.content?.[0]?.type === 'text' ? msg.content[0].text : '';
  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    return NextResponse.json({ error: 'Claude did not return JSON', raw: text }, { status: 500 });
  }

  const base = GenerationSchema.safeParse(parsed);
  if (!base.success) {
    return NextResponse.json({ error: 'Invalid generation shape', issues: base.error.issues }, { status: 422 });
  }

  const g = base.data;

  let cleanedProps: any = {};
  switch (g.templateId) {
    case 'memeCoin':
      cleanedProps = MemeCoinPropsSchema.parse(g.props);
      break;
    case 'appLanding':
      cleanedProps = AppLandingPropsSchema.parse(g.props);
      break;
    case 'stepWizardBrief':
      cleanedProps = StepWizardPropsSchema.parse(g.props);
      break;
    case 'landingTemplate':
      cleanedProps = LandingTemplatePropsSchema.parse(g.props);
      break;
    case 'bubbleClickerShell':
    case 'minimalDocs':
    case 'landingGradient':
    default:
      cleanedProps = BasePropsSchema.parse(g.props);
  }

  const baseSlug = slugify(g.slug || (cleanedProps?.title ?? 'site'));
  const slug = baseSlug.length < 3 ? `${baseSlug || 'site'}-${nano()}` : `${baseSlug}-${nano(4)}`;

  await saveSite(slug, { templateId: g.templateId, props: cleanedProps });

  return NextResponse.json({ slug });
}
