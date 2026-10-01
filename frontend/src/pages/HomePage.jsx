import { site as fallback } from '../data/site';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { SkillGrid } from '../components/SkillGrid';
import { SocialLinks } from '../components/SocialLinks';
import { ContactForm } from '../components/ContactForm';

export function HomePage({ data }) {
  const site = { ...fallback, ...data.site };
  const featured = data.projects.filter((project) => project.featured);
  const rest = data.projects.filter((project) => !project.featured);

  return (
    <main id="main">
      <section id="home" className="hero">
        <div className="container fade-up">
          <p className="eyebrow">{site.specializations.join(' • ')}</p>
          <h1>{site.headline}</h1>
          <p className="lede">{site.lede}</p>
          <p>
            <strong>{site.name}</strong> · {site.title}
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View My Work
            </a>
            <a className="btn btn-ghost" href="#contact">
              Contact Me
            </a>
          </div>
          <SocialLinks github={site.github || site.publicGithub} linkedin={site.linkedin} />
        </div>
      </section>

      <Section id="about" kicker="01" title="Professional introduction">
        <div className="grid-2">
          <div>
            {fallback.about.map((paragraph) => (
              <p className="lede" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="card">
            <p className="kicker">Developer focus</p>
            <ul>
              <li>Full-stack web systems with React and Node.js</li>
              <li>Applied AI and machine learning in domain-specific products</li>
              <li>Security-aware application design</li>
              <li>Deployable software with inspectable source</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="skills" kicker="02" title="Technical skills">
        <SkillGrid skills={data.skills} />
      </Section>

      <Section id="projects" kicker="03" title="Featured projects">
        <div className="projects-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <Section id="experience" kicker="04" title="Experience">
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
          <div className="empty-state">
            No formal employment entries are listed. Technical work is documented through the
            projects and GitHub repositories on this site. Additional roles can be added from the
            admin dashboard when they are verified.
          </div>
        )}
      </Section>

      <Section id="education" kicker="05" title="Education">
        <div className="timeline">
          {data.education.map((item) => (
            <article className="timeline-item" key={item.id}>
              <div>
                <div className="faint">{item.period}</div>
                <span className="chip">{item.status}</span>
              </div>
              <div className="card">
                <h3>{item.program}</h3>
                <p>{item.institution}</p>
                <p className="muted">{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="certifications" kicker="06" title="Certifications">
        <div className="certs-grid">
          {data.certifications.map((item) => (
            <article className="cert-card" key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.issuer}</p>
              {item.issued_on ? <p className="faint">{item.issued_on}</p> : <p className="faint">Date available in admin records</p>}
              {item.credential ? <p className="muted">{item.credential}</p> : null}
            </article>
          ))}
        </div>
      </Section>

      <Section id="github" kicker="07" title="GitHub">
        {data.github?.available ? (
          <>
            <p className="muted">
              Public profile @{data.github.username} · {data.github.publicRepos} repositories ·{' '}
              {data.github.followers} followers
            </p>
            <div className="github-grid">
              {data.github.repos.map((repo) => (
                <a className="card" key={repo.name} href={repo.url} target="_blank" rel="noreferrer">
                  <h3>{repo.name}</h3>
                  <p className="muted">{repo.description || 'No description provided on GitHub.'}</p>
                  <p className="faint">
                    {repo.language || 'Language n/a'} · {repo.stars} stars
                  </p>
                </a>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            Live GitHub data is unavailable right now.{' '}
            <a href={site.github} target="_blank" rel="noreferrer">
              View repositories on GitHub
            </a>
            .
          </div>
        )}
      </Section>

      <Section id="contact" kicker="08" title="Contact">
        <div className="grid-2">
          <div>
            <p className="lede">
              For collaboration, technical review, or project discussion, send a message. Submissions
              are stored by the Node.js API and reviewed from the admin dashboard.
            </p>
            {site.email ? <p>Email: {site.email}</p> : null}
            <SocialLinks github={site.github} linkedin={site.linkedin} />
          </div>
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
