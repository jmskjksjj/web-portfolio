import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import {
  projects,
  getProjectBySlug,
  categoryLabels,
} from "@/lib/projects";
import { T } from "@/components/TranslatedText";
import { ProjectType, ProjectDescription, ProjectDetailText } from "@/components/ProjectDetail";
import { McpToolsSection } from "@/components/McpToolsSection";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);
    return {
      title: project ? `${project.name} — SeonJ` : "Project Not Found",
    };
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-6 py-16 md:py-20">
      {/* Back link */}
      <Link
        href={`/projects/${project.category}`}
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8 md:mb-12"
      >
        <ArrowLeft size={14} />
        {categoryLabels[project.category]}
      </Link>

      {/* Header */}
      <div className="mb-10 md:mb-16">
        <div className="flex items-baseline gap-3 mb-4">
          <h1 className="text-2xl md:text-4xl font-light tracking-tight">
            {project.name}
          </h1>
          <span className="font-mono text-[10px] md:text-xs text-text-muted px-2 py-0.5 bg-tag-bg border border-border rounded whitespace-nowrap">
            {project.status}
          </span>
        </div>

        <p className="text-[13px] md:text-sm font-mono text-text-muted mb-4 md:mb-6">
          <ProjectType project={project} />
        </p>

        <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed max-w-2xl">
          <ProjectDescription project={project} />
        </p>
      </div>

      {/* Hero media or MCP tools */}
      <div className="mb-10 md:mb-16">
        {project.category === "mcp" && project.tools && project.tools.length > 0 ? (
          <McpToolsSection tools={project.tools} />
        ) : project.video ? (
          <div className="rounded-lg overflow-hidden border border-border" style={{ aspectRatio: "16 / 9" }}>
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ) : project.images && project.images.length > 0 ? (
          <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
            <Image
              src={project.images[0]}
              alt={`${project.name} screenshot`}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="aspect-video bg-surface border border-border rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-text-muted text-sm font-mono mb-2">
                Screenshot / Video
              </div>
              <div className="text-text-muted text-xs">
                Add images to /public/projects/{project.slug}/
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-10 md:gap-16 mb-10 md:mb-16">
        <div>
          <h2 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium mb-3 md:mb-4">
            <T k="detail.overview" />
          </h2>
          <p className="text-[15px] md:text-[15px] text-text-secondary font-light leading-[1.85]">
            <ProjectDetailText project={project} />
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h3 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium mb-3 md:mb-4">
                <T k="detail.metrics" />
              </h3>
              <div className="grid grid-cols-2 md:flex md:flex-col gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex justify-between items-baseline">
                    <span className="text-xs text-text-muted">{m.label}</span>
                    <span className="font-mono text-sm font-medium">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium mb-3 md:mb-4">
              <T k="detail.stack" />
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2 py-0.5 bg-tag-bg text-tag-text rounded border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional images */}
      {(() => {
        const extraImages = project.video ? project.images : project.images?.slice(1);
        return extraImages && extraImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-10 md:mb-16">
            {extraImages.map((img, idx) => (
              <div key={idx} className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border">
                <Image
                  src={img}
                  alt={`${project.name} screenshot ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        ) : null;
      })()}
    </div>
  );
}
