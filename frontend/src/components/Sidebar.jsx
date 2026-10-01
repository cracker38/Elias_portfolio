import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, site } from '../data/site';
import { cv } from '../data/cv';

const SECTION_IDS = navItems.map((item) => item.href.replace('/#', ''));

export function Sidebar({ github, linkedin }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) return undefined;
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.15, 0.4, 0.7] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  return (
    <>
      <button
        className="sidebar-toggle"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? '×' : '☰'}
      </button>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-profile">
          <img className="avatar" src={site.avatar} alt="" width="140" height="140" />
          <h2 className="sidebar-name">{site.name}</h2>
          <p className="sidebar-role">{site.title}</p>
          <p className="sidebar-place">Kirehe, Rwanda</p>
        </div>
        <nav className="sidebar-nav" aria-label="Primary">
          {navItems.map((item) => {
            const id = item.href.replace('/#', '');
            const href = isHome ? `#${id}` : item.href;
            return (
              <a
                key={item.href}
                className={isHome && activeId === id ? 'active' : ''}
                href={href}
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
        </div>
      </aside>
      {open ? (
        <button className="sidebar-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />
      ) : null}
    </>
  );
}
