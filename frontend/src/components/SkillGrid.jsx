const order = [
  'Programming',
  'Frontend',
  'Backend',
  'Databases',
  'AI / Machine Learning',
  'Cybersecurity',
  'Tools',
];

export function SkillGrid({ skills }) {
  const grouped = order
    .map((category) => ({
      category,
      items: skills.filter((skill) => skill.category === category),
    }))
    .filter((group) => group.items.length);

  return (
    <div className="skills-wrap">
      {grouped.map((group) => (
        <div className="skill-card" key={group.category}>
          <h3>{group.category}</h3>
          <div className="skill-list">
            {group.items.map((skill) => (
              <div className="skill-pill" key={skill.id}>
                {skill.name}
                <span>{skill.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
