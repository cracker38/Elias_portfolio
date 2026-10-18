import { cv } from '../data/cv';

function CvSection({ title, children }) {
  return (
    <section className="cv-section">
      <h2>{title}</h2>
      <div className="cv-section-content">{children}</div>
    </section>
  );
}

function CvEntry({ period, organization, title, children }) {
  return (
    <article className="cv-entry">
      <div className="cv-period">{period}</div>
      <div>
        {organization ? <p className="cv-organization">{organization}</p> : null}
        {title ? <h3>{title}</h3> : null}
        {children}
      </div>
    </article>
  );
}

export function ResumePage() {
  const skillCategories = [...new Set(cv.skills.map((skill) => skill.category))];

  return (
    <main id="main" className="block resume-page">
      <article className="cv-sheet">
        <header className="cv-header">
          <div>
            <p className="cv-eyebrow">Curriculum Vitae</p>
            <h1>{cv.name}</h1>
            <p className="cv-role">{cv.title}</p>
          </div>
          <div className="cv-actions hero-actions">
            <a className="btn lift" href={cv.cvFile} download>
              Download PDF
            </a>
            <button className="btn-outline lift" type="button" onClick={() => window.print()}>
              Print
            </button>
          </div>
        </header>

        <CvSection title="Contact">
          <p>
            <a href={`mailto:${cv.email}`}>{cv.email}</a>
          </p>
          <p>
            <a href={`tel:${cv.phone.replace(/\s/g, '')}`}>{cv.phone}</a>
          </p>
          <p>{cv.location}</p>
        </CvSection>

        <CvSection title="Objective">
          <p>{cv.objective}</p>
        </CvSection>

        <CvSection title="Experience">
          <div className="cv-entry-list">
            {cv.experience.map((item) => (
              <CvEntry key={item.id} period={item.period} organization={item.organization} title={item.role}>
                <ul className="cv-list">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </CvEntry>
            ))}
          </div>
        </CvSection>

        <CvSection title="Education">
          <div className="cv-entry-list">
            {cv.education.map((item) => (
              <CvEntry
                key={item.id}
                period={item.period}
                organization={item.institution}
                title={item.status ? `${item.program} (${item.status})` : item.program}
              />
            ))}
          </div>
        </CvSection>

        <CvSection title="Skills">
          <div className="cv-skills-list">
            {skillCategories.map((category) => (
              <div className="cv-skill-row" key={category}>
                <h3>{category}</h3>
                <p>{cv.skills.filter((skill) => skill.category === category).map((skill) => skill.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </CvSection>

        <CvSection title="Projects">
          <div className="cv-entry-list">
            {cv.projects.map((project) => (
              <article className="cv-project" key={project.id}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.links ? (
                  <ul className="cv-list cv-project-links">
                    {project.links.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank" rel="noreferrer">
                          {link.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </CvSection>
      </article>

      <article className="cv-sheet cv-sheet-continuation">
        <header className="cv-continuation-header">
          <p>{cv.name}</p>
        </header>

        <CvSection title="Achievements & Awards">
          <ul className="cv-list">
            {cv.certifications.map((item) => (
              <li key={item.id}>
                {item.name}
                {item.issuer ? ` – ${item.issuer}` : ''}
                {item.issued_on ? ` (Issued ${item.issued_on})` : ''}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Interests">
          <ul className="cv-list">
            {cv.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Languages">
          <ul className="cv-list">
            {cv.languages.map((language) => (
              <li key={language.name}>
                {language.name}: {language.level}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Reference">
          <div className="cv-reference-list">
            {cv.references.map((reference) => (
              <article className="cv-reference" key={reference.name}>
                <h3>{reference.name}</h3>
                <p>{reference.organization}</p>
                <p>{reference.role}</p>
                <p>
                  <a href={`tel:${reference.phone.replace(/\s/g, '')}`}>{reference.phone}</a>
                </p>
              </article>
            ))}
          </div>
        </CvSection>

        <CvSection title="Declaration">
          <p>{cv.declaration}</p>
          <p className="cv-signature">{cv.name}</p>
        </CvSection>
      </article>
    </main>
  );
}
