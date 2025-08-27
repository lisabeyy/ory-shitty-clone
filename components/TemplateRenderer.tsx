import React from "react";
import LandingGradient from "./templates/LandingGradient";
import MemeCoin from "./templates/MemeCoin";
import BubbleClickerShell from "./templates/BubbleClickerShell";
import MinimalDocs from "./templates/MinimalDocs";
import AppLanding from "./templates/AppLanding";
import StepWizardBrief from "./templates/StepWizardBrief";
import type { TemplateId } from "@/lib/templates";

const map: Record<TemplateId, React.ComponentType<any>> = {
  landingGradient: LandingGradient,
  memeCoin: MemeCoin,
  bubbleClickerShell: BubbleClickerShell,
  minimalDocs: MinimalDocs,
  appLanding: AppLanding,
  stepWizardBrief: StepWizardBrief,
};

export default function TemplateRenderer({ templateId, props }: { templateId: TemplateId; props: any }) {
  const Cmp = map[templateId];
  if (!Cmp) return <div>Unknown template: {templateId}</div>;
  return <Cmp {...props} />;
}
