import { site } from '../data/site';

export function Footer({ github, linkedin }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>{site.name}</strong>
          <div className="faint">{site.title}</div>
        </div>
        <div className="inline-links">
          {github ? (
            <a href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {linkedin ? (
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
          <a href="/admin">Admin</a>
        </div>
        <div className="faint">© {new Date().getFullYear()} {site.name}</div>
      </div>
    </footer>
  );
}
