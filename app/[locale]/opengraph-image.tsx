import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SmartIX — Smart software solutions";

const logoData = readFileSync(
  join(process.cwd(), "public/assets/logo/logo-text.png")
);
const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "uz");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background:
            "radial-gradient(1000px 600px at 15% 0%, #1b1252 0%, transparent 55%), radial-gradient(900px 600px at 100% 100%, #0b2a4a 0%, transparent 55%), #05060f",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={720} height={200} alt="SmartIX" />

        {/* tagline */}
        <div
          style={{
            marginTop: 44,
            fontSize: 40,
            lineHeight: 1.3,
            color: "#9aa0c3",
            maxWidth: 940,
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