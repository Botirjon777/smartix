import Image from "next/image";

export default function Logo({
  className = "h-8 w-auto md:h-9",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/assets/logo/logo-text.png"
      alt="SmartIX"
      width={1510}
      height={420}
      priority={priority}
      className={`${className} drop-shadow-[0_2px_12px_rgba(79,124,255,0.25)]`}
    />
  );
}