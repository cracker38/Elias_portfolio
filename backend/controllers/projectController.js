import { projectModel } from '../models/projectModel.js';

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function listProjects(req, res) {
  res.json(projectModel.list());
}

export function getProject(req, res) {
  const project = projectModel.findBySlug(req.params.id) || projectModel.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  return res.json(project);
}

export function createProject(req, res) {
  const slug = req.body.slug || slugify(req.body.title);
  if (projectModel.findBySlug(slug)) {
    return res.status(409).json({ error: 'A project with this slug already exists.' });
  }
  const project = projectModel.create({ ...req.body, slug });
  return res.status(201).json(project);
}

export function updateProject(req, res) {
  const existing = projectModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  const slug = req.body.slug || existing.slug;
  const conflict = projectModel.findBySlug(slug);
  if (conflict && String(conflict.id) !== String(req.params.id)) {
    return res.status(409).json({ error: 'A project with this slug already exists.' });
  }
  return res.json(projectModel.update(req.params.id, { ...req.body, slug }));
}

export function deleteProject(req, res) {
  const existing = projectModel.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  projectModel.remove(req.params.id);
  return res.json({ ok: true });
}
