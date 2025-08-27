import { getSite } from "@/lib/store";
import TemplateRenderer from "@/components/TemplateRenderer";
import { TemplateIdSchema } from "@/lib/templates";
import { notFound } from "next/navigation";

export default async function SitePage({ params }: { params: { slug: string } }) {
  const data = await getSite(params.slug);
  if (!data) return notFound();
  const parse = TemplateIdSchema.safeParse(data.templateId);
  if (!parse.success) return notFound();
  return <TemplateRenderer templateId={parse.data} props={data.props || {}} />;
}
