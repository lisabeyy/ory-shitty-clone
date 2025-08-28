import { notFound } from "next/navigation";
import { getSite } from "@/lib/store";
import TemplateRenderer from "@/components/TemplateRenderer";

interface SitePageProps {
  params: {
    slug: string;
  };
}

export default async function SitePage({ params }: SitePageProps) {
  const { slug } = params;
  
  console.log("SitePage called with slug:", slug);
  
  const siteData = await getSite(slug);
  
  if (!siteData) {
    console.log("No data found, returning notFound()");
    notFound();
  }
  
  console.log("Retrieved site data:", siteData);
  console.log("Props:", siteData.props);
  console.log("Style params:", siteData.props?.styleParams);
  
  const { templateId, props, title, icon } = siteData;
  
  return (
    <TemplateRenderer 
      templateId={templateId} 
      props={{ ...props, title, icon }} 
    />
  );
}
