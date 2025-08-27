import React from "react";
import MemeCoin from "./templates/MemeCoin";
import AppLanding from "./templates/AppLanding";
import StepWizardBrief from "./templates/StepWizardBrief";
import MinimalDocs from "./templates/MinimalDocs";
import LandingGradient from "./templates/LandingGradient";
import BubbleClickerShell from "./templates/BubbleClickerShell";
import LandingTemplate from "./templates/LandingTemplate";

interface TemplateRendererProps {
  templateId: string;
  props: any;
}

export default function TemplateRenderer({ templateId, props }: TemplateRendererProps) {
  // Extract title and icon from props or use defaults
  const title = props?.title || "Amazing Website";
  const icon = props?.icon || "✨";

  switch (templateId) {
    case "memeCoin":
      return <MemeCoin {...props} title={title} icon={icon} />;
    case "appLanding":
      return <AppLanding {...props} title={title} icon={icon} />;
    case "stepWizard":
      return <StepWizardBrief {...props} title={title} icon={icon} />;
    case "minimalDocs":
      return <MinimalDocs {...props} title={title} icon={icon} />;
    case "landingGradient":
      return <LandingGradient {...props} title={title} icon={icon} />;
    case "bubbleClickerShell":
      return <BubbleClickerShell {...props} title={title} icon={icon} />;
    case "landingTemplate":
      return <LandingTemplate {...props} title={title} icon={icon} />;
    default:
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-2">Template Not Found</h1>
            <p className="text-white/60">Template "{templateId}" is not available.</p>
          </div>
        </div>
      );
  }
}
