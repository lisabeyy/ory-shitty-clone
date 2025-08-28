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
  title: z.string(),
  subtitle: z.string(),
  bullets: z.array(z.string()),
  ctaText: z.string(),
  icon: z.string(),
  // Style parameters that get generated once and stored
  styleParams: z.object({
    colorScheme: z.string(),
    gridLayout: z.string(),
    accentColor: z.string().optional()
  }).optional()
});
export type BaseProps = z.infer<typeof BasePropsSchema>;

export const MemeCoinPropsSchema = BasePropsSchema.extend({
  ticker: z.string(),
  supply: z.string(),
  icon: z.string(),
});
export type MemeCoinProps = z.infer<typeof MemeCoinPropsSchema>;

export const AppLandingPropsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  badges: z.array(z.string()),
  features: z.array(z.string()),
  showcaseTitle: z.string(),
  ctaPrimary: z.string(),
  ctaSecondary: z.string(),
  icon: z.string(),
  // Style parameters that get generated once and stored
  styleParams: z.object({
    colorScheme: z.string(),
    gridLayout: z.string(),
    accentColor: z.string().optional()
  }).optional()
});
export type AppLandingProps = z.infer<typeof AppLandingPropsSchema>;

export const StepWizardPropsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  steps: z.array(z.object({ title: z.string(), desc: z.string().optional() })),
  highlights: z.array(z.string()),
  ctaPrimary: z.string(),
  disclaimer: z.string(),
  icon: z.string(),
  // Style parameters that get generated once and stored
  styleParams: z.object({
    colorScheme: z.string(),
    gridLayout: z.string(),
    accentColor: z.string().optional()
  }).optional()
});
export type StepWizardProps = z.infer<typeof StepWizardPropsSchema>;

export const LandingTemplatePropsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  badges: z.array(z.string()),
  features: z.array(z.string()),
  showcaseTitle: z.string(),
  ctaPrimary: z.string(),
  ctaSecondary: z.string(),
  logo: z.string().optional(),
  backgroundImage: z.string().optional(),
  colorScheme: z.enum(['cool', 'degen', 'cyberpunk', 'trendy', 'sport', 'random']).default('random'),
  accentColor: z.string().optional(),
  icon: z.string(),
  // Style parameters that get generated once and stored
  styleParams: z.object({
    colorScheme: z.string(),
    gridLayout: z.string(),
    accentColor: z.string().optional()
  }).optional()
});
export type LandingTemplateProps = z.infer<typeof LandingTemplatePropsSchema>;

export const CardGridPropsSchema = BasePropsSchema.extend({
  icon: z.string(),
});
export type CardGridProps = z.infer<typeof CardGridPropsSchema>;

export const TimelinePropsSchema = BasePropsSchema.extend({
  icon: z.string(),
});
export type TimelineProps = z.infer<typeof TimelinePropsSchema>;

export const MagazinePropsSchema = BasePropsSchema.extend({
  icon: z.string(),
});
export type MagazineProps = z.infer<typeof MagazinePropsSchema>;

export type AnyProps = BaseProps | MemeCoinProps | AppLandingProps | StepWizardProps | LandingTemplateProps | CardGridProps | TimelineProps | MagazineProps;

export const GenerationSchema = z.object({
  templateId: TemplateIdSchema,
  slug: z.string().min(3).max(64),
  props: z.record(z.any()),
});
export type Generation = z.infer<typeof GenerationSchema>;
