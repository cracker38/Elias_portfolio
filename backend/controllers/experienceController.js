import { experienceModel } from '../models/experienceModel.js';

export function listExperience(req, res) {
  res.json(experienceModel.list());
}

export function createExperience(req, res) {
  res.status(201).json(experienceModel.create(req.body));
}

export function updateExperience(req, res) {
  const item = experienceModel.update(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Experience not found.' });
  return res.json(item);
}

export function deleteExperience(req, res) {
  const existing = experienceModel.findById(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Experience not found.' });
  experienceModel.remove(req.params.id);
  return res.json({ ok: true });
}
