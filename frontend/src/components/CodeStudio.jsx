import { useEffect, useState } from 'react';

const FILES = [
  {
    path: 'systems/secure-build.js',
    body: `export async function ship({ auth, tests }) {
  if (!auth || !tests) throw new Error('gate failed');
  return deploy({ hashed: true, logged: true });
}`,
  },
  {
    path: 'api/contact.route.js',
    body: `router.post('/api/contact', rateLimit, validate, async (req, res) => {
  await messages.create(req.body);
  return res.status(201).json({ ok: true });
});`,
  },
  {
    path: 'models/crop.rank.py',
    body: `def rank(soil, season):
    scores = model.predict(soil, season)
    return explain(scores)  # agronomy + ML`,
  },
];

const SIGNS = ['{ }', '</>', '=>', 'git', 'JWT', 'SQL'];

export function CodeStudio() {
  const [active, setActive] = useState(false);
  const [file, setFile] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!active) {
      setTyped('');
      return undefined;
    }
    const full = FILES[file].body;
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setFile((n) => (n + 1) % FILES.length), 1600);
      }
    }, 16);
    return () => window.clearInterval(timer);
  }, [active, file]);

  return (
    <div
      className={`code-studio ${active ? 'is-live' : ''}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="studio-idle">
        <span className="studio-mark">{'</>'}</span>
        <p>Empty workspace</p>
        <small>Hover here — code stays off the rest of the page</small>
      </div>
      <div className="studio-live" aria-hidden={!active}>
        <div className="studio-tabs">
          {FILES.map((item, index) => (
            <span key={item.path} className={index === file ? 'on' : ''}>
              {item.path}
            </span>
          ))}
        </div>
        <pre>
          <code>
            {typed}
            {active ? <b className="caret" /> : null}
          </code>
        </pre>
        <div className="studio-signs">
          {SIGNS.map((sign) => (
            <em key={sign}>{sign}</em>
          ))}
        </div>
      </div>
    </div>
  );
}
