import Link from 'next/link';

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="caatgSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7f8f9" />
          <stop offset="22%" stopColor="#e2e4e8" />
          <stop offset="45%" stopColor="#9a9fa9" />
          <stop offset="60%" stopColor="#c7cad1" />
          <stop offset="80%" stopColor="#e8eaed" />
          <stop offset="100%" stopColor="#a9adb8" />
        </linearGradient>
        <linearGradient id="caatgGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2dfa8" />
          <stop offset="30%" stopColor="#d4ab48" />
          <stop offset="55%" stopColor="#a9803a" />
          <stop offset="80%" stopColor="#e0bd66" />
          <stop offset="100%" stopColor="#c9a24a" />
        </linearGradient>
      </defs>
      {/* Silver bracket — an open, embracing "C" */}
      <polyline
        points="205,70 95,70 95,230 205,230"
        fill="none"
        stroke="url(#caatgSilver)"
        strokeWidth="32"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Gold chevron accent, overlapping the bracket's opening */}
      <polyline
        points="150,230 205,150 245,230"
        fill="none"
        stroke="url(#caatgGold)"
        strokeWidth="26"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Wordmark({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`font-display font-bold tracking-widest2 bg-clip-text text-transparent ${
        tone === 'light' ? 'bg-metal-gradient' : 'bg-gradient-to-b from-obsidian-700 to-obsidian-900'
      }`}
    >
      CAATG
    </span>
  );
}

export function Logo({
  className = '',
  markClassName = 'h-9 w-9',
  showTagline = false,
  size = 'md',
}: {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const textSize = size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-lg' : 'text-2xl';
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 select-none ${className}`}>
      <LogoMark className={`${markClassName} shrink-0 drop-shadow-[0_0_12px_rgba(201,162,74,0.15)] transition-transform duration-500 group-hover:scale-105`} />
      <span className="flex flex-col leading-none">
        <span className={`${textSize} tracking-widest2`}>
          <Wordmark />
        </span>
        <span className="flex items-center gap-2 mt-1">
          <span className="h-px w-3 bg-gold-500/70" />
          <span className="text-[10px] font-medium tracking-widest2 text-gold-400">LTD</span>
          <span className="h-px w-3 bg-gold-500/70" />
        </span>
        {showTagline && (
          <span className="mt-1 text-[9px] uppercase tracking-widest2 text-silver-500">
            Electronics &middot; Technology &middot; Devices
          </span>
        )}
      </span>
    </Link>
  );
}

export function LogoMarkOnly({ className }: { className?: string }) {
  return <LogoMark className={className} />;
}
