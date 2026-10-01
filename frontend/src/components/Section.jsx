export function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="block">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
