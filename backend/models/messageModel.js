import { db } from '../config/db.js';

export const messageModel = {
  list() {
    return db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
  },
  create({ name, email, message }) {
    const result = db
      .prepare('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)')
      .run(name, email, message);
    return db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(result.lastInsertRowid);
  },
  markRead(id) {
    db.prepare('UPDATE contact_messages SET read = 1 WHERE id = ?').run(id);
    return db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(id);
  },
};
