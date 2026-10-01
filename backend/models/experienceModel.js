import { db } from '../config/db.js';
import { mapExperience, stringifyJson } from './helpers.js';

export const experienceModel = {
  list() {
    return db.prepare('SELECT * FROM experiences ORDER BY sort_order, id DESC').all().map(mapExperience);
  },
  findById(id) {
    return mapExperience(db.prepare('SELECT * FROM experiences WHERE id = ?').get(id));
  },
  create(data) {
    const result = db
      .prepare(
        `INSERT INTO experiences (role, organization, period, responsibilities, technologies, achievements, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        data.role,
        data.organization,
        data.period,
        stringifyJson(data.responsibilities),
        stringifyJson(data.technologies),
        stringifyJson(data.achievements),
        data.sort_order ?? 0
      );
    return this.findById(result.lastInsertRowid);
  },
  update(id, data) {
    const existing = this.findById(id);
    if (!existing) return null;
    db.prepare(
      `UPDATE experiences SET role = ?, organization = ?, period = ?, responsibilities = ?,
       technologies = ?, achievements = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(
      data.role ?? existing.role,
      data.organization ?? existing.organization,
      data.period ?? existing.period,
      stringifyJson(data.responsibilities ?? existing.responsibilities),
      stringifyJson(data.technologies ?? existing.technologies),
      stringifyJson(data.achievements ?? existing.achievements),
      data.sort_order ?? existing.sort_order,
      id
    );
    return this.findById(id);
  },
  remove(id) {
    return db.prepare('DELETE FROM experiences WHERE id = ?').run(id);
  },
};
