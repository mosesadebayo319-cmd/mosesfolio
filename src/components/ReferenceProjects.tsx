"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PublicProject } from "@/src/lib/content-loader";
export default function ReferenceProjects({
  projects,
}: {
  projects: (Pick<
    PublicProject,
    "id" | "title" | "client" | "category" | "role" | "image" | "stack"
  > & { results?: PublicProject["results"] })[];
}) {
  const [category, setCategory] = useState("All projects");
  const [search, setSearch] = useState("");
  const visible = projects.filter((project) => {
    const group = /development|product|website/i.test(project.category)
      ? "Websites and products"
      : "Marketing";
    return (
      (category === "All projects" || category === group) &&
      [
        project.title,
        project.client,
        project.category,
        ...(project.stack || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );
  });
  return (
    <section className="ja-project-panel cr-wrap" aria-label="Find a project">
      <h2>Selected projects</h2>
      <div className="ja-project-fields">
        <label>
          Filter by
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter projects"
          >
            <option>All projects</option>
            <option>Websites and products</option>
            <option>Marketing</option>
          </select>
        </label>
        <label>
          Search projects
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search portfolio projects"
          />
        </label>
      </div>
      <div className="ja-project-results" aria-live="polite">
        {visible.map((project) => (
          <article key={project.id} className="ja-course-card">
            <Link href={`/case-studies#${project.id}`}>
              <div className="ja-course-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width:600px) 90vw, 300px"
                  unoptimized
                />
              </div>
              <div className="ja-course-copy">
                <h3>
                  {project.title
                    .replace(": NGO reporting workspace", "")
                    .replace(" LinkedIn awareness campaign", "")}
                </h3>
                <p>{project.category}</p>
                <p>{project.role}</p>
                {!!project.stack?.length && (
                  <ul className="ja-stack" aria-label="Tools used">
                    {project.stack.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                )}
                {project.results && (
                  <div className="ja-campaign-results">
                    <p>
                      <strong>{project.results.metric1}</strong>{" "}
                      {project.results.label1.toLowerCase()}
                    </p>
                    <p>
                      <strong>{project.results.metric2}</strong>{" "}
                      {project.results.label2.toLowerCase()}
                    </p>
                    <p className="ja-project-note">
                      Awareness campaign. No recorded leads or conversions.
                    </p>
                  </div>
                )}
                <span className="ja-case-link">Read case study</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {!visible.length && (
        <div className="ja-no-results">
          <p>No projects match that search.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All projects");
              setSearch("");
            }}
          >
            Show all projects
          </button>
        </div>
      )}
    </section>
  );
}
