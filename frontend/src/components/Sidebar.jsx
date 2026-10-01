import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, site } from '../data/site';
import { cv } from '../data/cv';

export function Sidebar({ github, linkedin }) {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState(() => window.location.hash || '#home');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <>
      <button
        className="sidebar-toggle"
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        ☰
      </button>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-profile">
          <img className="avatar lift-media" src={site.avatar} alt={`${site.name} portrait`} width="140" height="140" />
          <h2 className="sidebar-name">{site.name}</h2>
          <p className="sidebar-role">{site.title}</p>
          <p className="sidebar-place">{cv.location}</p>
        </div>
        <nav className="sidebar-nav" aria-label="Primary">
          {navItems.map((item) => {
            const local = item.href.replace('/', '');
            const active = isHome && (hash === local || (local === '#home' && !location.hash));
            return (
              <a
                key={item.href}
                className={active ? 'active' : ''}
                href={isHome ? local : item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <a href={`mailto:${cv.email}`}>Email</a>
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
          <a href={cv.cvFile} download>
            Download CV
          </a>
          <Link to="/resume" onClick={() => setOpen(false)}>
            Online CV
          </Link>
        </div>
      </aside>
      {open ? <button className="sidebar-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}
    </>
  );
}
