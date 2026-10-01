import { useState } from 'react';
import { site as fallback } from '../data/site';
import { cv } from '../data/cv';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { SkillGrid } from '../components/SkillGrid';
import { ContactForm } from '../components/ContactForm';
import { CodeStudio } from '../components/CodeStudio';

export function HomePage({ data }) {
  const site = { ...fallback, ...data.site, email: data.site?.email || cv.email };
  const titles = site.specializations;
  const [slide, setSlide] = useState(0);
  const current = titles[slide] || site.title;
  const featured = data.projects.filter((project) => project.featured);
  const rest = data.projects.filter((project) => !project.featured);
  const projects = [...featured, ...rest];
  const experience = data.experience?.length ? data.experience : cv.experience;
  const education = data.education?.length >= 3 ? data.education : cv.education;
  const certifications = data.certifications?.length >= 4 ? data.certifications : cv.certifications;

  return (
    <main id="main">
      <section id="home" className="hero-panel">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">Kirehe, Rwanda</p>
            <h1>
              <span>I am</span>
              <span>a</span>
              <em>{current}</em>
            </h1>
            <p className="hero-sub">{site.lede}</p>
            <div className="hero-actions">
              <a className="btn" href="#projects">
                View Portfolio
              </a>
              <a className="btn-outline" href={cv.cvFile} download>
                Download CV
              </a>
            </div>
            <div className="hero-arrows">
              <button type="button" aria-label="Previous title" onClick={() => setSlide((v) => (v === 0 ? titles.length - 1 : v - 1))}>
                ←
              </button>
              <button type="button" aria-label="Next title" onClick={() => setSlide((v) => (v === titles.length - 1 ? 0 : v + 1))}>
                →
              </button>
            </div>
          </div>
          <div className="hero-photo">
            <img src={site.avatar} alt={`${site.name}, software developer`} />
          </div>
        </div>
        <CodeStudio />
      </section>

      <Section id="about" kicker="About" title="Who I am">
        <p className="lead">{cv.objective}</p>
        <ul className="about-points">
          <li>Full-stack web systems with React, Node.js, PHP, and REST APIs</li>
          <li>Mobile development with Flutter</li>
          <li>AI-powered applications and applied machine learning</li>
          <li>Cybersecurity and application security in the delivery cycle</li>
        </ul>
        <div className="meta-grid">
          <article className="plain-card">
            <p className="kicker">Contact</p>
            <p>
              <a href={`mailto:${cv.email}`}>{cv.email}</a>
            </p>
            <p>
              <a href={`tel:${cv.phone.replace(/\s/g, '')}`}>{cv.phone}</a>
            </p>
            <p className="muted">{cv.location}</p>
          </article>
          <article className="plain-card">
            <p className="kicker">Languages</p>
            <ul className="tight-list">
              {cv.languages.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong> — {item.level}
                </li>
              ))}
            </ul>
          </article>
        </div>
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
        <div className="web-work">
          <p className="kicker">Web systems contributed to</p>
          <div className="chip-row">
            {cv.webWork.map((item) => (
              <a className="skill-tag" key={item.url} href={item.url} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section id="experience" kicker="Experience" title="Experience">
        <div className="timeline">
          {experience.map((item) => (
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
      </Section>

      <Section id="education" kicker="Education" title="Education">
        <div className="timeline">
          {education.map((item) => (
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
          {certifications.map((item) => (
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
            <p className="lead">
              For collaboration, technical review, or project discussion, send a message through the
              API-backed form.
            </p>
            <p>
              <a href={`mailto:${cv.email}`}>{cv.email}</a>
              <br />
              <a href={`tel:${cv.phone.replace(/\s/g, '')}`}>{cv.phone}</a>
            </p>
            <a className="btn-outline" href={cv.cvFile} download>
              Download CV (PDF)
            </a>
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
