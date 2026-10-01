import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ theme, onToggleTheme, site }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        github={site.github}
        linkedin={site.linkedin}
      />
      <Outlet />
      <Footer github={site.github} linkedin={site.linkedin} />
    </>
  );
}
