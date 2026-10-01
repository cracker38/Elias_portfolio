import { educationModel } from '../models/educationModel.js';

export function listEducation(req, res) {
  res.json(educationModel.list());
}

export function createEducation(req, res) {
  res.status(201).json(educationModel.create(req.body));
}

export function updateEducation(req, res) {
  const item = educationModel.update(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Education record not found.' });
  return res.json(item);
}

export function deleteEducation(req, res) {
  const existing = educationModel.findById(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Education record not found.' });
  educationModel.remove(req.params.id);
  return res.json({ ok: true });
}
