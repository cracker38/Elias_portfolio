export function Section({ id, kicker, title, children, action }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-head">
          <div>
            {kicker ? <p className="kicker">{kicker}</p> : null}
            <h2>{title}</h2>
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
