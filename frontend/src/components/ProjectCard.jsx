import { Link } from 'react-router-dom';

export function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`}>
      <p className="kicker">{featured ? 'Featured' : 'Project'}</p>
      <h3>{project.title}</h3>
      <p className="muted">{project.summary}</p>
      {project.problem ? (
        <p>
          <strong>Problem. </strong>
          {project.problem}
        </p>
      ) : null}
      <div className="chip-row">
        {(project.technologies || []).slice(0, 6).map((tech) => (
          <span className="chip" key={tech}>
            {tech}
          </span>
        ))}
      </div>
      {Array.isArray(project.features) && project.features.length ? (
        <p className="muted">{project.features.slice(0, 3).join(' · ')}</p>
      ) : null}
      <div className="inline-links" style={{ marginTop: 'auto' }}>
        <Link to={`/projects/${project.slug}`}>Details</Link>
        {project.github_url ? (
          <a href={project.github_url} target="_blank" rel="noreferrer">
            GitHub
          </a>
        ) : null}
        {project.live_url ? (
          <a href={project.live_url} target="_blank" rel="noreferrer">
            Live demo
          </a>
        ) : null}
      </div>
    </article>
  );
}
