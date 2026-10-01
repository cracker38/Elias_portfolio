import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems, site } from '../data/site';

export function Navbar({ theme, onToggleTheme, github, linkedin }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" to="/" aria-label={`${site.name} home`}>
          <span className="brand-mark">ED</span>
          Elias
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={isHome ? item.href.replace('/', '') : item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          {github ? (
            <a className="hide-sm" href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {linkedin ? (
            <a className="hide-sm" href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
          <Link className="btn btn-ghost hide-sm" to="/resume">
            CV
          </Link>
          <button className="icon-btn" type="button" onClick={onToggleTheme} aria-label="Toggle color theme">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
          >
            ☰
          </button>
        </div>
      </div>
      <div className={`container mobile-menu ${open ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={isHome ? item.href.replace('/', '') : item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <NavLink to="/resume" onClick={() => setOpen(false)}>
          Download CV
        </NavLink>
      </div>
    </header>
  );
}
