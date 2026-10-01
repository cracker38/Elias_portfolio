import { useState } from 'react';
import { site as fallback } from '../data/site';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { SkillGrid } from '../components/SkillGrid';
import { ContactForm } from '../components/ContactForm';

export function HomePage({ data }) {
  const site = { ...fallback, ...data.site };
  const titles = site.specializations;
  const [slide, setSlide] = useState(0);
  const current = titles[slide] || site.title;
  const featured = data.projects.filter((project) => project.featured);
  const rest = data.projects.filter((project) => !project.featured);
  const projects = [...featured, ...rest];

  function prev() {
    setSlide((value) => (value === 0 ? titles.length - 1 : value - 1));
  }

  function next() {
    setSlide((value) => (value === titles.length - 1 ? 0 : value + 1));
  }

  return (
    <main id="main">
      <section id="home" className="hero-panel">
        <div className="hero-copy">
          <h1>
            <span>I am</span>
            <span>a</span>
            <em>{current}</em>
          </h1>
          <p className="hero-sub">{site.lede}</p>
          <a className="btn-outline" href="#projects">
            View Portfolio
          </a>
        </div>
        <div className="hero-photo">
          <img src={site.avatar} alt="" />
        </div>
        <div className="hero-arrows">
          <button type="button" aria-label="Previous title" onClick={prev}>
            ←
          </button>
          <button type="button" aria-label="Next title" onClick={next}>
            →
          </button>
        </div>
      </section>

      <Section id="about" kicker="About" title="Who I am">
        {fallback.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ul className="about-points">
          <li>Full-stack web systems with React and Node.js</li>
          <li>Applied AI and machine learning in domain-specific products</li>
          <li>Security-aware application design</li>
          <li>Deployable software with inspectable source</li>
        </ul>
      </Section>

      <Section id="skills" kicker="Skills" title="Technical skills">
        <SkillGrid skills={data.skills} />
      </Section>

      <Section id="projects" kicker="Work" title="Projects">
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} featured={index === 0} index={index} />
          ))}
        </div>
      </Section>

      <Section id="experience" kicker="Experience" title="Experience">
        {data.experience.length ? (
          <div className="timeline">
            {data.experience.map((item) => (
              <article className="timeline-item" key={item.id}>
                <div>
                  <div className="faint">{item.period}</div>
                  <strong>{item.organization}</strong>
                </div>
                <div>
                  <h3>{item.role}</h3>
                  <ul>
                    {(item.responsibilities || []).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">
            No formal employment is listed. Projects and GitHub repositories are the primary record of
            technical work.
          </p>
        )}
      </Section>

      <Section id="education" kicker="Education" title="Education">
        <div className="timeline">
          {data.education.map((item) => (
            <article className="timeline-item" key={item.id}>
              <div>
                <div className="faint">{item.period}</div>
                <span className="chip">{item.status}</span>
              </div>
              <div>
                <h3>{item.program}</h3>
                <p>{item.institution}</p>
                <p className="muted">{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="certifications" kicker="Certifications" title="Certifications">
        <div className="card-grid">
          {data.certifications.map((item) => (
            <article className="plain-card" key={item.id}>
              <p className="kicker">{item.issuer}</p>
              <h3>{item.name}</h3>
              {item.issued_on ? <p className="faint">{item.issued_on}</p> : null}
            </article>
          ))}
        </div>
      </Section>

      <Section id="github" kicker="GitHub" title="Public repositories">
        {data.github?.available ? (
          <div className="card-grid">
            {data.github.repos.map((repo) => (
              <a className="plain-card" key={repo.name} href={repo.url} target="_blank" rel="noreferrer">
                <h3>{repo.name}</h3>
                <p className="muted">{repo.description || 'Repository on GitHub.'}</p>
                <p className="faint">{repo.language || 'Source'}</p>
              </a>
            ))}
          </div>
        ) : (
          <p className="empty-state">
            <a href={site.github} target="_blank" rel="noreferrer">
              View GitHub profile
            </a>
          </p>
        )}
      </Section>

      <Section id="contact" kicker="Contact" title="Get in touch">
        <div className="split">
          <div>
            <p>
              For collaboration, technical review, or project discussion, send a message. Submissions
              go to the Node.js API and are reviewed privately.
            </p>
            <p>
              <a href={site.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              {site.linkedin ? (
                <>
                  {' · '}
                  <a href={site.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </>
              ) : null}
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>

      <footer className="page-foot">
        © {new Date().getFullYear()} {site.name} · Software Developer
      </footer>
    </main>
  );
}
