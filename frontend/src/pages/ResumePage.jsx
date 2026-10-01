import { site } from '../data/site';
import { cv } from '../data/cv';

export function ResumePage({ data }) {
  const education = data.education?.length >= 3 ? data.education : cv.education;
  const certifications = data.certifications?.length >= 4 ? data.certifications : cv.certifications;
  const experience = data.experience?.length ? data.experience : cv.experience;

  return (
    <main className="block">
      <p className="kicker">Curriculum vitae</p>
      <h1>{site.name}</h1>
      <p className="hero-sub">{cv.objective}</p>
      <div className="hero-actions" style={{ marginBottom: 24 }}>
        <a className="btn lift" href={cv.cvFile} download>
          Download PDF
        </a>
        <button className="btn-outline lift" type="button" onClick={() => window.print()}>
          Print
        </button>
      </div>
      <p>
        {cv.email} · {cv.phone}
        <br />
        {cv.location}
      </p>

      <section>
        <h2>Experience</h2>
        {experience.map((item) => (
          <p key={item.id}>
            <strong>{item.role}</strong>, {item.organization} · {item.period}
          </p>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {education.map((item) => (
          <p key={item.id}>
            <strong>{item.program}</strong>, {item.institution} · {item.period} ({item.status})
          </p>
        ))}
      </section>

      <section>
        <h2>Selected projects</h2>
        {data.projects
          .filter((project) => project.featured)
          .map((project) => (
            <p key={project.id}>
              <strong>{project.title}.</strong> {project.summary}
            </p>
          ))}
      </section>

      <section>
        <h2>Skills</h2>
        <p>{data.skills.map((skill) => skill.name).join(' · ')}</p>
      </section>

      <section>
        <h2>Certifications</h2>
        {certifications.map((item) => (
          <p key={item.id}>
            {item.name} — {item.issuer}
            {item.issued_on ? ` (${item.issued_on})` : ''}
          </p>
        ))}
      </section>
    </main>
  );
}
