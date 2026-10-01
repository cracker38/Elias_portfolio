import { env } from '../config/env.js';
import { getGithubProfile } from '../services/githubService.js';

export function getSite(req, res) {
  res.json({
    name: 'Elias Dukuzumuremyi',
    title: 'Software Developer',
    github: env.publicGithub,
    linkedin: env.publicLinkedin,
    email: env.publicEmail,
    githubUsername: env.githubUsername,
  });
}

export async function getGithub(req, res) {
  const data = await getGithubProfile();
  res.json(data);
}
