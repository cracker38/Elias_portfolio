import { messageModel } from '../models/messageModel.js';

export function createMessage(req, res) {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const message = String(req.body.message || '').trim();
  messageModel.create({ name, email, message });
  return res.status(201).json({ ok: true, message: 'Message received.' });
}

export function listMessages(req, res) {
  res.json(messageModel.list());
}

export function markMessageRead(req, res) {
  const item = messageModel.markRead(req.params.id);
  if (!item) return res.status(404).json({ error: 'Message not found.' });
  return res.json(item);
}
