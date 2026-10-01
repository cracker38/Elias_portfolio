import { site } from '../data/site';

export function ResumePage({ data }) {
  return (
    <main className="container" style={{ padding: '48px 0 80px' }}>
      <p className="eyebrow">Curriculum vitae</p>
      <h1>{site.name}</h1>
      <p className="lede">{site.positioning}</p>
      <div className="hero-actions">
        <button className="btn btn-primary" type="button" onClick={() => window.print()}>
          Save / print CV
        </button>
      </div>

      <section className="section">
        <h2>Focus</h2>
        <p>{site.lede}</p>
      </section>

      <section className="section">
        <h2>Education</h2>
        {data.education.map((item) => (
          <p key={item.id}>
            <strong>{item.program}</strong>, {item.institution} · {item.period} ({item.status})
          </p>
        ))}
      </section>

      <section className="section">
        <h2>Selected projects</h2>
        {data.projects
          .filter((project) => project.featured)
          .map((project) => (
            <p key={project.id}>
              <strong>{project.title}.</strong> {project.summary}{' '}
              {project.github_url ? (
                <a href={project.github_url} target="_blank" rel="noreferrer">
                  Repository
                </a>
              ) : null}
            </p>
          ))}
      </section>

      <section className="section">
        <h2>Skills</h2>
        <p>{data.skills.map((skill) => skill.name).join(' · ')}</p>
      </section>

      <section className="section">
        <h2>Certifications</h2>
        {data.certifications.map((item) => (
          <p key={item.id}>
            {item.name} — {item.issuer}
          </p>
        ))}
      </section>
    </main>
  );
}
