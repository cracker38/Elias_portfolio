export function SocialLinks({ github, linkedin }) {
  return (
    <div className="inline-links">
      {github ? (
        <a href={github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      ) : null}
      {linkedin ? (
        <a href={linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      ) : null}
      <a href="/resume">Download CV</a>
    </div>
  );
}
