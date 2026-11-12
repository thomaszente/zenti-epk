const LINKS = [
  ['#bio', 'Bio'],
  ['#journey', 'Journey'],
  ['#experience', 'Experience'],
  ['#listen', 'Listen'],
  ['#photos', 'Photos'],
  ['#rider', 'Rider']
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <a href="#top" aria-label="ZENTI, back to top">
          <img src="img/zenti-logo.png" alt="ZENTI" width="58" height="22" />
        </a>
        <ul>
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <a className="btn solid sm" href="#book">Book ZENTI</a>
      </div>
    </header>
  );
}
