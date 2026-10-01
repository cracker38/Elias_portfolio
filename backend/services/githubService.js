import { env } from '../config/env.js';

const cache = {
  data: null,
  expiresAt: 0,
};

export async function getGithubProfile() {
  if (cache.data && Date.now() < cache.expiresAt) {
    return cache.data;
  }

  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'elias-portfolio',
  };
  if (env.githubToken) {
    headers.Authorization = `Bearer ${env.githubToken}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${env.githubUsername}`, { headers }),
      fetch(
        `https://api.github.com/users/${env.githubUsername}/repos?per_page=100&sort=updated`,
        { headers }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return cache.data || { available: false, username: env.githubUsername, repos: [] };
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    const payload = {
      available: true,
      username: user.login,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      avatarUrl: user.avatar_url,
      repos: (Array.isArray(repos) ? repos : [])
        .filter((repo) => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 8)
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          updatedAt: repo.updated_at,
          homepage: repo.homepage,
        })),
    };

    cache.data = payload;
    cache.expiresAt = Date.now() + 10 * 60 * 1000;
    return payload;
  } catch {
    return cache.data || { available: false, username: env.githubUsername, repos: [] };
  }
}
