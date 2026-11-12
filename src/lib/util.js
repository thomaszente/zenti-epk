/* Shared helpers: reduced-motion flag, toast bus, clipboard. */

export const still =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let listeners = [];

export function toast(message) {
  listeners.forEach((fn) => fn(message));
}

export function onToast(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

export function copyText(text, done) {
  const fail = () => toast('Copy was blocked. Select the text and copy it by hand.');
  try {
    navigator.clipboard.writeText(text).then(() => toast(done), fail);
  } catch (e) {
    fail();
  }
}

/* Cursor-following glow used on cards. Spread onto any element with class "glow". */
export function glowProps() {
  return {
    onPointerMove: (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px');
      e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px');
    }
  };
}
