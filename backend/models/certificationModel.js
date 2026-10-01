import { db } from '../config/db.js';

export const certificationModel = {
  list() {
    return db.prepare('SELECT * FROM certifications ORDER BY sort_order, id DESC').all();
  },
  findById(id) {
    return db.prepare('SELECT * FROM certifications WHERE id = ?').get(id);
  },
  create(data) {
    const result = db
      .prepare(
        'INSERT INTO certifications (name, issuer, issued_on, credential, url, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .run(
        data.name,
        data.issuer,
        data.issued_on || '',
        data.credential || '',
        data.url || '',
        data.sort_order ?? 0
      );
    return this.findById(result.lastInsertRowid);
  },
  update(id, data) {
    const existing = this.findById(id);
    if (!existing) return null;
    db.prepare(
      `UPDATE certifications SET name = ?, issuer = ?, issued_on = ?, credential = ?, url = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(
      data.name ?? existing.name,
      data.issuer ?? existing.issuer,
      data.issued_on ?? existing.issued_on,
      data.credential ?? existing.credential,
      data.url ?? existing.url,
      data.sort_order ?? existing.sort_order,
      id
    );
    return this.findById(id);
  },
  remove(id) {
    return db.prepare('DELETE FROM certifications WHERE id = ?').run(id);
  },
};
