import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

export function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/api/projects/${slug}`)
      .then(setProject)
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <main className="container" style={{ padding: '48px 0' }}>
        <p className="alert error">{error}</p>
        <Link to="/">Back to work</Link>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="container" style={{ padding: '48px 0' }}>
        <p>Loading project…</p>
      </main>
    );
  }

  const blocks = [
    ['Project overview', project.description],
    ['Problem', project.problem],
    ['Solution', project.solution],
    ['Architecture', project.architecture],
    ['Challenges', project.challenges],
    ['What I learned', project.lessons],
  ];

  return (
    <main>
      <div className="container project-hero">
        <Link to="/#projects">← Projects</Link>
        <p className="eyebrow">Project</p>
        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
        <div className="inline-links">
          {project.github_url ? (
            <a href={project.github_url} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {project.live_url ? (
            <a href={project.live_url} target="_blank" rel="noreferrer">
              Live demo
            </a>
          ) : (
            <span className="faint">Live demo not published</span>
          )}
        </div>
      </div>
      <div className="container detail-grid" style={{ paddingBottom: 64 }}>
        <div>
          {blocks.map(([title, body]) =>
            body ? (
              <section className="section" key={title} style={{ paddingTop: 24 }}>
                <h2>{title}</h2>
                <p className="lede">{body}</p>
              </section>
            ) : null
          )}
          <section className="section" style={{ paddingTop: 24 }}>
            <h2>Features</h2>
            <ul>
              {(project.features || []).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside>
          <div className="card">
            <h2>Technologies</h2>
            <div className="chip-row">
              {(project.technologies || []).map((tech) => (
                <span className="chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <ArchitectureDiagram title={project.title} />
        </aside>
      </div>
    </main>
  );
}
