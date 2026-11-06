import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageSeo } from "@/src/data/content";
import { getPublicProjects, getPublicServices } from "@/src/lib/content-loader";
import { Collaborators } from "@/src/components/CreativeSections";
import { StartProject } from "@/src/components/CreativeUI";
import PortfolioHero from "@/src/components/PortfolioHero";
import ProjectImage from "@/src/components/ProjectImage";
import ReferenceProjects from "@/src/components/ReferenceProjects";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: pageSeo.home.title },
  description: pageSeo.home.description,
  alternates: { canonical: "/" },
};
export default async function HomePage() {
  const [projects, services] = await Promise.all([
    getPublicProjects(),
    getPublicServices(),
  ]);
  const featured = projects.find((project) => project.featured);
  // Send only the fields used by the interactive grid to the browser.
  const selected = projects
    .filter((project) => project.id !== featured?.id)
    .map((project) => ({
      id: project.id,
      title: project.title,
      client: project.client,
      category: project.category,
      role: project.role,
      image: project.image,
      stack: project.stack,
      imageFit: project.imageFit,
      imagePosition: project.imagePosition,
      outcomeNote: project.outcomeNote,
      results: project.results,
    }));
  return (
    <div className="ja-home">
      <PortfolioHero />
      <Collaborators />
      {featured && (
        <section
          className="ja-featured cr-wrap"
          aria-labelledby="featured-title"
        >
          <h2 id="featured-title">Featured project</h2>
          <article className="ja-feature-wide" data-reveal>
            <Link
              href={"/case-studies#" + featured.id}
              className="ja-feature-preview"
              aria-label={`Read ${featured.title} case study`}
            >
              <ProjectImage
                key={featured.image}
                imageFit={featured.imageFit}
                imagePosition={featured.imagePosition}
                src={featured.image}
                alt={featured.title}
                sizes="(max-width:760px) 90vw, 55vw"
              />
            </Link>
            <div className="ja-feature-copy">
              <h3>{featured.title}</h3>
              <p>{featured.problem}</p>
              {featured.role && (
                <p>
                  <strong>My role:</strong> {featured.role}
                </p>
              )}
              {!!featured.stack?.length && (
                <ul className="ja-stack" aria-label="Technology stack">
                  {featured.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              )}
              {featured.outcomeNote && (
                <p className="ja-project-note">{featured.outcomeNote}</p>
              )}
              <Link href={"/case-studies#" + featured.id} className="ja-button">
                Read case study
              </Link>
            </div>
          </article>
        </section>
      )}
      <ReferenceProjects projects={selected} />
      {!!services.length && (
        <section
          className="ja-home-services cr-wrap"
          aria-labelledby="services-title"
        >
          <div className="ja-home-section-heading">
            <h2 id="services-title">How I can help</h2>
            <Link href="/services">View services</Link>
          </div>
          <div className="ja-home-service-grid">
            {services.map((item) => (
              <article key={item.title} data-reveal>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="ja-home-about cr-wrap" aria-labelledby="about-title">
        <div className="ja-home-portrait">
          <Image
            src="/about-moses.jpg"
            alt="Moses Adebayo"
            fill
            sizes="(max-width:760px) 90vw, 400px"
          />
        </div>
        <div>
          <h2 id="about-title">About Moses Adebayo</h2>
          <p>
            I’m a digital marketer and product developer based in Abuja, working
            with businesses, nonprofits, and founders across Nigeria.
          </p>
          <p>
            I’m currently a Digital Marketing Executive at Jeda Systems. My work
            brings together campaigns, websites, and digital tools.
          </p>
          <div className="ja-home-about-links">
            <Link href="/about" className="ja-button">
              More about me
            </Link>
            <a href="/Moses-Adebayo-CV.pdf" download>
              Download CV
            </a>
          </div>
        </div>
      </section>
      <section className="ja-home-contact cr-wrap">
        <div>
          <h2>Discuss your project</h2>
          <p>
            Share what you want to build or improve, your timeline, and your
            budget.
          </p>
        </div>
        <div className="ja-home-contact-actions">
          <StartProject />
          <Link href="/contact">Contact Moses directly</Link>
        </div>
      </section>
    </div>
  );
}
