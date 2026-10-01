import { useEffect, useMemo, useState } from 'react';

const LINES = [
  'const engineer = { name: "Elias", focus: ["AI", "security", "full-stack"] };',
  'export async function build({ secure, scalable }) { return deploy(secure && scalable); }',
  'POST /api/contact  →  validate(email)  →  persist(message)',
  'git checkout -b feat/inspectable-systems && git commit -m "ship what you can review"',
  'SELECT title, stack FROM projects WHERE production_ready = TRUE;',
  'if (auth && hashedPassword) return jwt.sign(payload);',
  'flutter build apk --release  // Farmer Field Management',
  'nmap is for labs; production needs threat models and reviews.',
];

const GLYPHS = ['</>', '{ }', '=>', '()', '[]', 'API', 'JWT', 'SQL', 'git', 'npm', 'TLS', 'REST'];

export function DeveloperAura({ targetRef }) {
  const [pointer, setPointer] = useState({ x: 48, y: 80, on: false });
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState('');

  const glyphs = useMemo(
    () =>
      GLYPHS.map((label, index) => ({
        label,
        angle: (index / GLYPHS.length) * Math.PI * 2,
        radius: 78 + (index % 3) * 18,
      })),
    []
  );

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    function move(event) {
      const box = node.getBoundingClientRect();
      node.style.setProperty('--mx', `${event.clientX - box.left}px`);
      node.style.setProperty('--my', `${event.clientY - box.top}px`);
      setPointer({
        x: event.clientX - box.left,
        y: event.clientY - box.top,
        on: true,
      });
    }

    function leave() {
      setPointer((current) => ({ ...current, on: false }));
    }

    node.addEventListener('pointermove', move);
    node.addEventListener('pointerleave', leave);
    return () => {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerleave', leave);
    };
  }, [targetRef]);

  useEffect(() => {
    if (!pointer.on) return undefined;
    const full = LINES[lineIndex];
    setTyped('');
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setLineIndex((value) => (value + 1) % LINES.length);
        }, 1400);
      }
    }, 18);
    return () => window.clearInterval(timer);
  }, [lineIndex, pointer.on]);

  return (
    <div className={`dev-aura ${pointer.on ? 'is-on' : ''}`} aria-hidden="true">
      <pre className="dev-wallpaper">{LINES.join('\n')}</pre>
      <div
        className="dev-cursor"
        style={{
          transform: `translate(${pointer.x}px, ${pointer.y}px)`,
          opacity: pointer.on ? 1 : 0,
        }}
      >
        {glyphs.map((glyph) => (
          <span
            key={glyph.label}
            className="dev-glyph"
            style={{
              transform: `translate(${Math.cos(glyph.angle) * glyph.radius}px, ${Math.sin(glyph.angle) * glyph.radius}px)`,
            }}
          >
            {glyph.label}
          </span>
        ))}
        <div className="dev-terminal">
          <div className="dev-terminal-bar">
            <span />
            <span />
            <span />
            <em>elias@portfolio:~</em>
          </div>
          <code>
            $ {typed}
            <i className="caret" />
          </code>
        </div>
      </div>
    </div>
  );
}
