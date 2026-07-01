export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* grid */}
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* gradient blobs */}
      <div className="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-brand/25 blur-[120px] animate-float-slow" />
      <div className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-brand-2/20 blur-[120px] animate-float" />
      <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[130px] animate-float-slow" />

      {/* top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
    </div>
  );
}
