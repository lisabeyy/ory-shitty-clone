import { z } from "zod";

export const TemplateIdSchema = z.enum([
  "landingGradient",
  "memeCoin",
  "bubbleClickerShell",
  "minimalDocs",
  "appLanding",
  "stepWizardBrief",
  "landingTemplate",
  "cardGrid",
  "timeline",
  "magazine"
]);
export type TemplateId = z.infer<typeof TemplateIdSchema>;

export const BasePropsSchema = z.object({
  title: z.string().default("Untitled"),
  subtitle: z.string().default(""),
  bullets: z.array(z.string()).default([]),
  ctaText: z.string().default("Get Started"),
  icon: z.string().default("✨"),
});
export type BaseProps = z.infer<typeof BasePropsSchema>;

export const MemeCoinPropsSchema = BasePropsSchema.extend({
  ticker: z.string().default("$MEME"),
  supply: z.string().default("1,000,000,000"),
  icon: z.string().default("🚀"),
});
export type MemeCoinProps = z.infer<typeof MemeCoinPropsSchema>;

export const AppLandingPropsSchema = z.object({
  title: z.string(),
  subtitle: z.string().default(""),
  badges: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  showcaseTitle: z.string().default("Preview"),
  ctaPrimary: z.string().default("Open App"),
  ctaSecondary: z.string().default("Learn More"),
  icon: z.string().default("⚡"),
});
export type AppLandingProps = z.infer<typeof AppLandingPropsSchema>;

export const StepWizardPropsSchema = z.object({
  title: z.string(),
  subtitle: z.string().default(""),
  steps: z.array(z.object({ title: z.string(), desc: z.string().optional() })).default([]),
  highlights: z.array(z.string()).default([]),
  ctaPrimary: z.string().default("Get Started"),
  disclaimer: z.string().default(""),
  icon: z.string().default("📋"),
});
export type StepWizardProps = z.infer<typeof StepWizardPropsSchema>;

export const LandingTemplatePropsSchema = z.object({
  title: z.string(),
  subtitle: z.string().default(""),
  badges: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  showcaseTitle: z.string().default(""),
  ctaPrimary: z.string().default("Get Started"),
  ctaSecondary: z.string().default("Learn More"),
  logo: z.string().optional(),
  backgroundImage: z.string().optional(),
  colorScheme: z.enum(['cool', 'degen', 'cyberpunk', 'trendy', 'sport', 'random']).default('random'),
  accentColor: z.string().optional(),
  icon: z.string().default("🎯"),
});
export type LandingTemplateProps = z.infer<typeof LandingTemplatePropsSchema>;

export type AnyProps = BaseProps | MemeCoinProps | AppLandingProps | StepWizardProps | LandingTemplateProps;

export const GenerationSchema = z.object({
  templateId: TemplateIdSchema,
  slug: z.string().min(3).max(64),
  props: z.record(z.any()),
});
export type Generation = z.infer<typeof GenerationSchema>;
