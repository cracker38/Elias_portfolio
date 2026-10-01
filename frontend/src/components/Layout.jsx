import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout({ site }) {
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = 'light';
  }, []);

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Sidebar github={site.github} linkedin={site.linkedin} />
      <div className="stage">
        <Outlet />
      </div>
    </div>
  );
}
