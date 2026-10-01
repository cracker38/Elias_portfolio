import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { api } from '../services/api';

const tabs = ['Projects', 'Skills', 'Experience', 'Education', 'Certifications', 'Messages'];

function parseList(value) {
  if (!value) return [];
  return String(value)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminPage() {
  const { token, logout, user } = useAuth();
  const [tab, setTab] = useState('Projects');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);

  const endpoints = {
    Projects: '/api/projects',
    Skills: '/api/skills',
    Experience: '/api/experience',
    Education: '/api/education',
    Certifications: '/api/certifications',
    Messages: '/api/contact',
  };

  async function load() {
    setError('');
    try {
      setItems(await api.get(endpoints[tab]));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (token) load();
  }, [tab, token]);

  if (!token) return <Navigate to="/admin/login" replace />;

  async function save(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const payload = Object.fromEntries(form.entries());
    if (tab === 'Projects') {
      payload.technologies = parseList(payload.technologies);
      payload.features = parseList(payload.features);
      payload.featured = payload.featured === 'on';
    }
    if (tab === 'Experience') {
      payload.responsibilities = parseList(payload.responsibilities);
      payload.technologies = parseList(payload.technologies);
      payload.achievements = parseList(payload.achievements);
    }
    try {
      if (editing) await api.put(`${endpoints[tab]}/${editing.id}`, payload);
      else await api.post(endpoints[tab], payload);
      setEditing(null);
      event.target.reset();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!window.confirm('Delete this record?')) return;
    const path =
      tab === 'Messages' ? `${endpoints[tab]}/${id}` : `${endpoints[tab]}/${id}`;
    try {
      if (tab === 'Messages') {
        await api.patch(`/api/contact/${id}/read`, {});
      } else {
        await api.delete(path);
      }
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <p className="kicker">{user?.email}</p>
        {tabs.map((name) => (
          <button key={name} className={tab === name ? 'active' : ''} type="button" onClick={() => { setTab(name); setEditing(null); }}>
            {name}
          </button>
        ))}
        <button type="button" onClick={logout}>
          Sign out
        </button>
      </aside>
      <div className="admin-main">
        <h1>{tab}</h1>
        {error ? <p className="alert error">{error}</p> : null}

        {tab !== 'Messages' ? (
          <form className="form form-card" onSubmit={save} key={`${tab}-${editing?.id || 'new'}`}>
            {tab === 'Projects' ? <ProjectFields editing={editing} /> : null}
            {tab === 'Skills' ? <SkillFields editing={editing} /> : null}
            {tab === 'Experience' ? <ExperienceFields editing={editing} /> : null}
            {tab === 'Education' ? <EducationFields editing={editing} /> : null}
            {tab === 'Certifications' ? <CertificationFields editing={editing} /> : null}
            <button className="btn btn-primary" type="submit">
              {editing ? 'Update' : 'Create'}
            </button>
          </form>
        ) : null}

        <table className="table">
          <thead>
            <tr>
              <th>Record</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.title || item.name || item.role || item.program || item.email}</strong>
                  <div className="muted">{item.summary || item.message || item.institution || item.category || item.organization}</div>
                </td>
                <td className="row-actions">
                  {tab !== 'Messages' ? (
                    <button className="btn btn-ghost" type="button" onClick={() => setEditing(item)}>
                      Edit
                    </button>
                  ) : null}
                  <button className="btn btn-ghost" type="button" onClick={() => remove(item.id)}>
                    {tab === 'Messages' ? 'Mark read' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProjectFields({ editing }) {
  return (
    <>
      <label>Title<input name="title" defaultValue={editing?.title} required /></label>
      <label>Slug<input name="slug" defaultValue={editing?.slug} /></label>
      <label>Summary<textarea name="summary" defaultValue={editing?.summary} required /></label>
      <label>Description<textarea name="description" defaultValue={editing?.description} required /></label>
      <label>Problem<textarea name="problem" defaultValue={editing?.problem} /></label>
      <label>Solution<textarea name="solution" defaultValue={editing?.solution} /></label>
      <label>Architecture<textarea name="architecture" defaultValue={editing?.architecture} /></label>
      <label>Features (one per line)<textarea name="features" defaultValue={(editing?.features || []).join('\n')} /></label>
      <label>Challenges<textarea name="challenges" defaultValue={editing?.challenges} /></label>
      <label>Lessons<textarea name="lessons" defaultValue={editing?.lessons} /></label>
      <label>Technologies (one per line)<textarea name="technologies" defaultValue={(editing?.technologies || []).join('\n')} /></label>
      <label>GitHub URL<input name="github_url" defaultValue={editing?.github_url} /></label>
      <label>Live URL<input name="live_url" defaultValue={editing?.live_url} /></label>
      <label><input type="checkbox" name="featured" defaultChecked={Boolean(editing?.featured)} /> Featured</label>
    </>
  );
}

function SkillFields({ editing }) {
  return (
    <>
      <label>Name<input name="name" defaultValue={editing?.name} required /></label>
      <label>Category<input name="category" defaultValue={editing?.category} required /></label>
      <label>Proficiency<input name="proficiency" defaultValue={editing?.proficiency} /></label>
    </>
  );
}

function ExperienceFields({ editing }) {
  return (
    <>
      <label>Role<input name="role" defaultValue={editing?.role} required /></label>
      <label>Organization<input name="organization" defaultValue={editing?.organization} required /></label>
      <label>Period<input name="period" defaultValue={editing?.period} required /></label>
      <label>Responsibilities (one per line)<textarea name="responsibilities" defaultValue={(editing?.responsibilities || []).join('\n')} /></label>
      <label>Technologies (one per line)<textarea name="technologies" defaultValue={(editing?.technologies || []).join('\n')} /></label>
      <label>Achievements (one per line)<textarea name="achievements" defaultValue={(editing?.achievements || []).join('\n')} /></label>
    </>
  );
}

function EducationFields({ editing }) {
  return (
    <>
      <label>Program<input name="program" defaultValue={editing?.program} required /></label>
      <label>Institution<input name="institution" defaultValue={editing?.institution} required /></label>
      <label>Period<input name="period" defaultValue={editing?.period} required /></label>
      <label>Status<input name="status" defaultValue={editing?.status} /></label>
      <label>Details<textarea name="details" defaultValue={editing?.details} /></label>
    </>
  );
}

function CertificationFields({ editing }) {
  return (
    <>
      <label>Name<input name="name" defaultValue={editing?.name} required /></label>
      <label>Issuer<input name="issuer" defaultValue={editing?.issuer} required /></label>
      <label>Issued on<input name="issued_on" defaultValue={editing?.issued_on} /></label>
      <label>Credential<input name="credential" defaultValue={editing?.credential} /></label>
      <label>URL<input name="url" defaultValue={editing?.url} /></label>
    </>
  );
}
