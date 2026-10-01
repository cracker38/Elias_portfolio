import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DeveloperAura } from './DeveloperAura';

export function Layout({ site }) {
  const stageRef = useRef(null);

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
      <div className="stage" ref={stageRef}>
        <DeveloperAura targetRef={stageRef} />
        <Outlet />
      </div>
    </div>
  );
}
