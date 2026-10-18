export function SkillGrid({ skills }) {
  const categories = [...new Set(skills.map((skill) => skill.category).filter(Boolean))];
  const grouped = categories
    .map((category) => ({
      category,
      items: skills.filter((skill) => skill.category === category),
    }))
    .filter((group) => group.items.length);

  return (
    <div className="skill-table">
      {grouped.map((group) => (
        <div className="skill-row" key={group.category}>
          <h3>{group.category}</h3>
          <div className="skill-list">
            {group.items.map((skill) => (
              <span className="skill-tag" key={skill.id}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
