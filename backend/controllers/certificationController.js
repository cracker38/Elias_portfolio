import { certificationModel } from '../models/certificationModel.js';

export function listCertifications(req, res) {
  res.json(certificationModel.list());
}

export function createCertification(req, res) {
  res.status(201).json(certificationModel.create(req.body));
}

export function updateCertification(req, res) {
  const item = certificationModel.update(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Certification not found.' });
  return res.json(item);
}

export function deleteCertification(req, res) {
  const existing = certificationModel.findById(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Certification not found.' });
  certificationModel.remove(req.params.id);
  return res.json({ ok: true });
}
