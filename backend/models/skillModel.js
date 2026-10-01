import { db } from '../config/db.js';

export const skillModel = {
  list() {
    return db.prepare('SELECT * FROM skills ORDER BY category, sort_order, name').all();
  },
  findById(id) {
    return db.prepare('SELECT * FROM skills WHERE id = ?').get(id);
  },
  create(data) {
    const result = db
      .prepare(
        'INSERT INTO skills (name, category, proficiency, sort_order) VALUES (?, ?, ?, ?)'
      )
      .run(data.name, data.category, data.proficiency || 'Working knowledge', data.sort_order ?? 0);
    return this.findById(result.lastInsertRowid);
  },
  update(id, data) {
    const existing = this.findById(id);
    if (!existing) return null;
    db.prepare(
      `UPDATE skills SET name = ?, category = ?, proficiency = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(
      data.name ?? existing.name,
      data.category ?? existing.category,
      data.proficiency ?? existing.proficiency,
      data.sort_order ?? existing.sort_order,
      id
    );
    return this.findById(id);
  },
  remove(id) {
    return db.prepare('DELETE FROM skills WHERE id = ?').run(id);
  },
};
