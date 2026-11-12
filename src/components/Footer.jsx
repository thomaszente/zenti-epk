import { CONTACT } from '../content.js';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>ZENTI · COSMOTION · ATX / NYC / MIA</span>
        <nav aria-label="Links">
          <a href={CONTACT.instagram}>Instagram</a>
          <a href={CONTACT.soundcloud}>SoundCloud</a>
          <a href={CONTACT.spotify}>Spotify</a>
          <a href={CONTACT.beatport}>Beatport</a>
          <a href={CONTACT.linktree}>Linktree</a>
        </nav>
      </div>
    </footer>
  );
}
