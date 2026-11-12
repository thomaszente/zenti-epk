import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from './util.js';
import { TRACKS } from '../content.js';

export function fmt(seconds) {
  const s = Math.max(0, Math.floor(seconds || 0));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

/* One audio element shared by the track list and the bar at the foot of the page.
   Nothing downloads until the visitor presses play. */
export default function usePlayer() {
  const audioRef = useRef(null);
  const pendingRef = useRef(null);
  const rafRef = useRef(0);
  const [current, setCurrent] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState(0);
  const [loaded, setLoaded] = useState(0);

  if (!audioRef.current && typeof Audio !== 'undefined') {
    audioRef.current = new Audio();
    audioRef.current.preload = 'none';
  }

  const total = useCallback(
    (i) => {
      const audio = audioRef.current;
      if (i === current && loaded) return loaded;
      return TRACKS[i] ? TRACKS[i].duration : 0;
    },
    [current, loaded]
  );

  const select = useCallback(
    (i, play, ratio) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (i !== current) {
        setCurrent(i);
        setLoaded(0);
        setNow(0);
        audio.src = TRACKS[i].src;
        pendingRef.current = ratio != null ? ratio : 0;
        audio.load();
      } else if (ratio != null) {
        if (audio.duration && isFinite(audio.duration)) {
          audio.currentTime = ratio * audio.duration;
          setNow(audio.currentTime);
        } else {
          pendingRef.current = ratio;
        }
      }
      if (play) {
        audio.play().catch(() => toast('Playback was blocked. Press play again.'));
      }
    },
    [current]
  );

  const toggle = useCallback(
    (i) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (i === current && !audio.paused) audio.pause();
      else select(i, true, null);
    },
    [current, select]
  );

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    setCurrent(-1);
    setNow(0);
    setLoaded(0);
  }, []);

  const next = useCallback(() => {
    const audio = audioRef.current;
    select((current + 1) % TRACKS.length, audio ? !audio.paused : false, 0);
  }, [current, select]);

  const prev = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || current < 0) return;
    if (audio.currentTime > 3) return select(current, !audio.paused, 0);
    select((current - 1 + TRACKS.length) % TRACKS.length, !audio.paused, 0);
  }, [current, select]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (current < 0) return select(0, true, 0);
    if (audio.paused) audio.play().catch(() => toast('Playback was blocked. Press play again.'));
    else audio.pause();
  }, [current, select]);

  /* Audio element events. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onMeta = () => {
      if (pendingRef.current != null) {
        try {
          audio.currentTime = pendingRef.current * audio.duration;
        } catch (e) {
          /* some browsers refuse a seek this early; the track still plays from 0 */
        }
        pendingRef.current = null;
      }
      setLoaded(audio.duration && isFinite(audio.duration) ? audio.duration : 0);
      setNow(audio.currentTime);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      if (audio.paused) setNow(audio.currentTime);
    };
    const onError = () => toast('That track could not be loaded.');

    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('error', onError);
    };
  }, []);

  /* Roll on to the next track when one finishes. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const onEnded = () => {
      if (current > -1 && current < TRACKS.length - 1) select(current + 1, true, 0);
      else {
        audio.currentTime = 0;
        setNow(0);
      }
    };
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [current, select]);

  /* Keep the clock moving while a track plays. */
  useEffect(() => {
    if (!playing) return undefined;
    const tick = () => {
      const audio = audioRef.current;
      if (audio) setNow(audio.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  /* Leave room at the foot of the page for the bar. */
  useEffect(() => {
    document.body.classList.toggle('hasbar', current > -1);
    return () => document.body.classList.remove('hasbar');
  }, [current]);

  return useMemo(
    () => ({
      tracks: TRACKS,
      current,
      playing,
      now,
      total,
      track: current > -1 ? TRACKS[current] : null,
      select,
      toggle,
      togglePlay,
      next,
      prev,
      stop
    }),
    [current, playing, now, total, select, toggle, togglePlay, next, prev, stop]
  );
}
