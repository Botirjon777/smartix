export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="SmartIX"
    >
      <defs>
        <linearGradient
          id="smx-badge"
          x1="10"
          y1="8"
          x2="54"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2dd4ef" />
          <stop offset="0.5" stopColor="#4f7cff" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="smx-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="17" fill="url(#smx-badge)" />
      <rect x="4" y="4" width="56" height="30" rx="17" fill="url(#smx-gloss)" />
      <path
        d="M44 24a11 11 0 1 0-12 10 11 11 0 1 1-12 10"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="49.5" cy="16.5" r="3" fill="#fff" />
      <circle cx="56" cy="12" r="1.9" fill="#fff" fillOpacity="0.85" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 drop-shadow-[0_4px_14px_rgba(99,102,241,0.45)]" />
      <span className="text-lg font-extrabold tracking-[0.14em]">
        SMART<span className="text-gradient">IX</span>
      </span>
    </span>
  );
}
