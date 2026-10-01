import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  jwtSecret: required('JWT_SECRET', 'dev-only-change-me'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  adminEmail: required('ADMIN_EMAIL', 'admin@localhost'),
  adminPassword: required('ADMIN_PASSWORD', 'ChangeThisPassword123!'),
  sqlitePath: process.env.SQLITE_PATH || path.join(__dirname, '..', 'data', 'portfolio.db'),
  githubUsername: process.env.GITHUB_USERNAME || 'cracker38',
  githubToken: process.env.GITHUB_TOKEN || '',
  publicEmail: process.env.PUBLIC_EMAIL || '',
  publicLinkedin: process.env.PUBLIC_LINKEDIN || '',
  publicGithub: process.env.PUBLIC_GITHUB || 'https://github.com/cracker38',
};
