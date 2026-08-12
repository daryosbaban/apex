'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

function getTargetTime() {
  const target = new Date();
  target.setHours(target.getHours() + 18, target.getMinutes() + 24, 0, 0);
  return target.getTime();
}

export function DealsCountdown() {
  const [target] = useState(getTargetTime);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (remaining === null) {
    return (
      <div className="flex items-center gap-2 text-sm text-gold-400">
        <Clock className="h-4 w-4" /> Loading offer timer...
      </div>
    );
  }

  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-gold-400">
      <Clock className="h-4 w-4" />
      Deals refresh in{' '}
      <span className="font-mono font-semibold text-white">
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    </div>
  );
}
