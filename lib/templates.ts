import { z } from "zod";

export const TemplateIdSchema = z.enum([
  "landingGradient",
  "memeCoin",
  "bubbleClickerShell",
  "minimalDocs",
  "appLanding",
  "stepWizardBrief",
]);
export type TemplateId = z.infer<typeof TemplateIdSchema>;

export const BasePropsSchema = z.object({
  title: z.string().default("Untitled"),
  subtitle: z.string().default(""),
  bullets: z.array(z.string()).default([]),
  ctaText: z.string().default("Get Started"),
});
export type BaseProps = z.infer<typeof BasePropsSchema>;

export const MemeCoinPropsSchema = BasePropsSchema.extend({
  ticker: z.string().default("$MEME"),
  supply: z.string().default("1,000,000,000"),
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
});
export type AppLandingProps = z.infer<typeof AppLandingPropsSchema>;

export const StepWizardPropsSchema = z.object({
  title: z.string(),
  subtitle: z.string().default(""),
  steps: z.array(z.object({ title: z.string(), desc: z.string().optional() })).default([]),
  highlights: z.array(z.string()).default([]),
  ctaPrimary: z.string().default("Get Started"),
  disclaimer: z.string().default(""),
});
export type StepWizardProps = z.infer<typeof StepWizardPropsSchema>;

export type AnyProps = BaseProps | MemeCoinProps | AppLandingProps | StepWizardProps;

export const GenerationSchema = z.object({
  templateId: TemplateIdSchema,
  slug: z.string().min(3).max(64),
  props: z.record(z.any()),
});
export type Generation = z.infer<typeof GenerationSchema>;
