import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { site as fallbackSite } from '../data/site';

export function usePortfolio() {
  const [state, setState] = useState({
    loading: true,
    error: '',
    site: fallbackSite,
    projects: [],
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    github: { available: false, repos: [] },
  });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [site, projects, skills, experience, education, certifications, github] =
          await Promise.all([
            api.get('/api/site'),
            api.get('/api/projects'),
            api.get('/api/skills'),
            api.get('/api/experience'),
            api.get('/api/education'),
            api.get('/api/certifications'),
            api.get('/api/site/github'),
          ]);
        if (!active) return;
        setState({
          loading: false,
          error: '',
          site: { ...fallbackSite, ...site },
          projects,
          skills,
          experience,
          education,
          certifications,
          github,
        });
      } catch (error) {
        if (!active) return;
        setState((current) => ({
          ...current,
          loading: false,
          error: error.message || 'Unable to load live data. Showing available content.',
        }));
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return state;
}
