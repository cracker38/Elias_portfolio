import { db } from '../config/db.js';

export const userModel = {
  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },
  create({ email, password_hash, role = 'admin' }) {
    const result = db
      .prepare('INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)')
      .run(email, password_hash, role);
    return db.prepare('SELECT id, email, role, created_at FROM users WHERE id = ?').get(result.lastInsertRowid);
  },
};
