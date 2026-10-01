export function ArchitectureDiagram({ title }) {
  return (
    <svg className="diagram" viewBox="0 0 720 220" role="img" aria-label={`${title} architecture`}>
      <rect x="20" y="70" width="160" height="80" rx="12" fill="none" stroke="currentColor" />
      <text x="100" y="116" textAnchor="middle" fill="currentColor" fontSize="14">
        Client
      </text>
      <rect x="280" y="70" width="160" height="80" rx="12" fill="none" stroke="currentColor" />
      <text x="360" y="116" textAnchor="middle" fill="currentColor" fontSize="14">
        API / Services
      </text>
      <rect x="540" y="70" width="160" height="80" rx="12" fill="none" stroke="currentColor" />
      <text x="620" y="116" textAnchor="middle" fill="currentColor" fontSize="14">
        Data / Models
      </text>
      <path d="M180 110 H280" stroke="currentColor" />
      <path d="M440 110 H540" stroke="currentColor" />
    </svg>
  );
}
