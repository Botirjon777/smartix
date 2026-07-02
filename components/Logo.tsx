import Image from "next/image";

export default function Logo({
  className = "h-8 w-auto md:h-9",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const shadow = "drop-shadow-[0_2px_12px_rgba(79,124,255,0.25)]";
  return (
    <>
      {/* light theme: dark wordmark */}
      <Image
        src="/assets/logo/logo-text.png"
        alt="SmartIX"
        width={1510}
        height={420}
        priority={priority}
        className={`${className} ${shadow} block dark:hidden`}
      />
      {/* dark theme: white wordmark */}
      <Image
        src="/assets/logo/logo-text-light.png"
        alt="SmartIX"
        width={1510}
        height={420}
        priority={priority}
        className={`${className} ${shadow} hidden dark:block`}
      />
    </>
  );
}