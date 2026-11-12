import { useEffect, useState } from 'react';
import { still } from './lib/util.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Bio from './components/Bio.jsx';
import Journey from './components/Journey.jsx';
import Experience from './components/Experience.jsx';
import Listen from './components/Listen.jsx';
import Photos from './components/Photos.jsx';
import Rider from './components/Rider.jsx';
import Booking from './components/Booking.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import PlayerBar from './components/PlayerBar.jsx';
import usePlayer from './lib/usePlayer.js';

export default function App() {
  /* The journey dial writes the chosen slot into the booking form. */
  const [slot, setSlot] = useState('Not sure yet');
  const player = usePlayer();

  useEffect(() => {
    if (!still) document.documentElement.classList.add('anim');
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Bio />
      <Journey onPickSlot={setSlot} />
      <Experience />
      <Listen player={player} />
      <Photos />
      <Rider />
      <Booking slot={slot} setSlot={setSlot} />
      <Footer />
      <PlayerBar player={player} />
      <Toast />
    </>
  );
}
