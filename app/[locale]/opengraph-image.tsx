import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SmartIX — Smart software solutions";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "uz");

  const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="130" height="130"><defs><linearGradient id="b" x1="10" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2dd4ef"/><stop offset="0.5" stop-color="#4f7cff"/><stop offset="1" stop-color="#a855f7"/></linearGradient><linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.25"/><stop offset="0.55" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="16" fill="url(#b)"/><rect x="2" y="2" width="60" height="32" rx="16" fill="url(#gl)"/><path d="M44 24a11 11 0 1 0-12 10 11 11 0 1 1-12 10" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="49.5" cy="16.5" r="3" fill="#fff"/><circle cx="56" cy="12" r="1.9" fill="#fff" fill-opacity="0.85"/></svg>`;
  const markDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(markSvg)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px 600px at 15% 0%, #1b1252 0%, transparent 55%), radial-gradient(900px 600px at 100% 100%, #0b2a4a 0%, transparent 55%), #05060f",
          fontFamily: "sans-serif",
        }}
      >
        {/* mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri} width={130} height={130} alt="SmartIX logo" />
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: 6,
              color: "#e7e9f5",
            }}
          >
            <span>SMART</span>
            <span
              style={{
                background: "linear-gradient(100deg, #6366f1, #a855f7, #22d3ee)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              IX
            </span>
          </div>
        </div>

        {/* tagline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 40,
            lineHeight: 1.3,
            color: "#9aa0c3",
            maxWidth: 900,
          }}
        >
          {dict.footer.tagline}
        </div>

        {/* footer row */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            color: "#6b7099",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#22d3ee",
            }}
          />
          smartix.uz
        </div>
      </div>
    ),
    { ...size }
  );
}
