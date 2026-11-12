import { useEffect, useRef, useState } from 'react';
import { onToast } from '../lib/util.js';

export default function Toast() {
  const [message, setMessage] = useState('');
  const timer = useRef(0);

  useEffect(() => {
    const off = onToast((msg) => {
      setMessage(msg);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(''), 2200);
    });
    return () => {
      off();
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={'toast' + (message ? ' show' : '')} role="status">
      {message}
    </div>
  );
}
