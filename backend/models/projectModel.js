import { db } from '../config/db.js';
import { mapProject, stringifyJson, toBool } from './helpers.js';

export const projectModel = {
  list() {
    return db
      .prepare('SELECT * FROM projects ORDER BY featured DESC, sort_order ASC, id DESC')
      .all()
      .map(mapProject);
  },
  findById(id) {
    return mapProject(db.prepare('SELECT * FROM projects WHERE id = ?').get(id));
  },
  findBySlug(slug) {
    return mapProject(db.prepare('SELECT * FROM projects WHERE slug = ?').get(slug));
  },
  create(data) {
    const result = db
      .prepare(
        `INSERT INTO projects (
          title, slug, summary, description, problem, solution, architecture,
          features, challenges, lessons, technologies, github_url, live_url,
          image, featured, sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        data.title,
        data.slug,
        data.summary,
        data.description,
        data.problem || '',
        data.solution || '',
        data.architecture || '',
        stringifyJson(data.features),
        data.challenges || '',
        data.lessons || '',
        stringifyJson(data.technologies),
        data.github_url || '',
        data.live_url || '',
        data.image || '',
        toBool(data.featured) ? 1 : 0,
        data.sort_order ?? 0
      );
    return this.findById(result.lastInsertRowid);
  },
  update(id, data) {
    const existing = this.findById(id);
    if (!existing) return null;
    db.prepare(
      `UPDATE projects SET
        title = ?, slug = ?, summary = ?, description = ?, problem = ?, solution = ?,
        architecture = ?, features = ?, challenges = ?, lessons = ?, technologies = ?,
        github_url = ?, live_url = ?, image = ?, featured = ?, sort_order = ?,
        updated_at = datetime('now')
      WHERE id = ?`
    ).run(
      data.title ?? existing.title,
      data.slug ?? existing.slug,
      data.summary ?? existing.summary,
      data.description ?? existing.description,
      data.problem ?? existing.problem,
      data.solution ?? existing.solution,
      data.architecture ?? existing.architecture,
      stringifyJson(data.features ?? existing.features),
      data.challenges ?? existing.challenges,
      data.lessons ?? existing.lessons,
      stringifyJson(data.technologies ?? existing.technologies),
      data.github_url ?? existing.github_url,
      data.live_url ?? existing.live_url,
      data.image ?? existing.image,
      toBool(data.featured ?? existing.featured) ? 1 : 0,
      data.sort_order ?? existing.sort_order,
      id
    );
    return this.findById(id);
  },
  remove(id) {
    return db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  },
};
