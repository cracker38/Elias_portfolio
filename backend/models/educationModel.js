import { db } from '../config/db.js';

export const educationModel = {
  list() {
    return db.prepare('SELECT * FROM education ORDER BY sort_order, id DESC').all();
  },
  findById(id) {
    return db.prepare('SELECT * FROM education WHERE id = ?').get(id);
  },
  create(data) {
    const result = db
      .prepare(
        'INSERT INTO education (program, institution, period, status, details, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .run(
        data.program,
        data.institution,
        data.period,
        data.status || 'Ongoing',
        data.details || '',
        data.sort_order ?? 0
      );
    return this.findById(result.lastInsertRowid);
  },
  update(id, data) {
    const existing = this.findById(id);
    if (!existing) return null;
    db.prepare(
      `UPDATE education SET program = ?, institution = ?, period = ?, status = ?, details = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(
      data.program ?? existing.program,
      data.institution ?? existing.institution,
      data.period ?? existing.period,
      data.status ?? existing.status,
      data.details ?? existing.details,
      data.sort_order ?? existing.sort_order,
      id
    );
    return this.findById(id);
  },
  remove(id) {
    return db.prepare('DELETE FROM education WHERE id = ?').run(id);
  },
};
