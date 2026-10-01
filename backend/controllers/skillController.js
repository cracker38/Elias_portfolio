import { skillModel } from '../models/skillModel.js';

export function listSkills(req, res) {
  res.json(skillModel.list());
}

export function createSkill(req, res) {
  res.status(201).json(skillModel.create(req.body));
}

export function updateSkill(req, res) {
  const skill = skillModel.update(req.params.id, req.body);
  if (!skill) return res.status(404).json({ error: 'Skill not found.' });
  return res.json(skill);
}

export function deleteSkill(req, res) {
  const existing = skillModel.findById(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Skill not found.' });
  skillModel.remove(req.params.id);
  return res.json({ ok: true });
}
