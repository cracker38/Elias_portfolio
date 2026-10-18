import { cv } from '../data/cv';

function CvSection({ title, children }) {
  return (
    <section className="cv-section">
      <h2>{title}</h2>
      <div className="cv-section-content">{children}</div>
    </section>
  );
}

export function ResumePage() {
  const skillCategories = [...new Set(cv.skills.map((skill) => skill.category))];

  return (
    <main id="main" className="block resume-page">
      <div className="cv-toolbar">
        <a className="btn lift" href={cv.cvFile} download>
          Download PDF
        </a>
        <button className="btn-outline lift" type="button" onClick={() => window.print()}>
          Print
        </button>
      </div>

      <article className="cv-sheet">
        <CvSection title="Contact">
          <h1 className="cv-contact-name">{cv.name}</h1>
          <p>{cv.location}</p>
          <p>
            <a href={`tel:${cv.phone.replace(/\s/g, '')}`}>{cv.phone}</a>
          </p>
          <p>
            <a href={`mailto:${cv.email}`}>{cv.email}</a>
          </p>
        </CvSection>

        <CvSection title="Objective">
          <p>{cv.objective}</p>
        </CvSection>

        <CvSection title="Experience">
          <div className="cv-entry-list">
            {cv.experience.map((item) => (
              <article className="cv-entry" key={item.id}>
                <p className="cv-period">{item.period}</p>
                <h3>{item.role}</h3>
                <p className="cv-organization">{item.organization}</p>
                <ul className="cv-list">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </CvSection>

        <CvSection title="Education">
          <div className="cv-entry-list">
            {cv.education.map((item) => (
              <article className="cv-entry cv-education-entry" key={item.id}>
                <p className="cv-education-heading">
                  <strong>{item.period}</strong> - {item.institution}
                </p>
                <p>{item.program}</p>
              </article>
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

        {cv.interests.length > 0 ? (
          <CvSection title="Interests">
            <div className="cv-interest-list">
              {cv.interests.map((interest) => (
                <p key={interest.name}>
                  <span className={interest.marker === '•' ? 'cv-big-dot' : undefined} aria-hidden="true">
                    {interest.marker}
                  </span>{' '}
                  {interest.name}
                </p>
              ))}
            </div>
          </CvSection>
        ) : null}

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
                <h3>{reference.name} - {reference.organization}</h3>
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
