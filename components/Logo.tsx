export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand via-brand-2 to-accent shadow-lg shadow-brand/30">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 8-4 4 4 4" />
          <path d="m16 8 4 4-4 4" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">
        Smart<span className="text-gradient">IX</span>
      </span>
    </span>
  );
}
