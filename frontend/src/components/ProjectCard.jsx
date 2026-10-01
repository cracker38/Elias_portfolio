import { Link } from 'react-router-dom';

export function ProjectCard({ project, featured = false, index = 0 }) {
  return (
    <article className={`work-item lift ${featured ? 'is-featured' : ''}`} data-file={project.slug}>
      <span className="work-index">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="chip-row">
          {(project.technologies || []).slice(0, 5).map((tech) => (
            <span className="chip" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="work-links">
        <Link to={`/projects/${project.slug}`}>Details</Link>
        {project.github_url ? (
          <a href={project.github_url} target="_blank" rel="noreferrer">
            GitHub
          </a>
        ) : null}
        {project.live_url ? (
          <a href={project.live_url} target="_blank" rel="noreferrer">
            Live
          </a>
        ) : null}
      </div>
    </article>
  );
}
