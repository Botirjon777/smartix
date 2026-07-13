import type { LeadPayload } from "@/lib/leads";

export const runtime = "edge";

/** Escape user-provided text for Telegram HTML parse_mode. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadPayload;
    const { type, name, phone, projectType, project, message, locale, source } =
      body ?? {};

    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof phone !== "string" ||
      phone.trim() === ""
    ) {
      return Response.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return Response.json(
        { ok: false, error: "not_configured" },
        { status: 503 }
      );
    }

    let text =
      `🆕 <b>New SmartIX lead</b> (${escapeHtml(String(type ?? ""))})\n\n` +
      `👤 <b>Name:</b> ${escapeHtml(name)}\n` +
      `📞 <b>Phone:</b> ${escapeHtml(phone)}\n`;

    if (projectType) text += `🏷 <b>Type:</b> ${escapeHtml(projectType)}\n`;
    if (project) text += `📦 <b>Project:</b> ${escapeHtml(project)}\n`;
    if (message) text += `📝 <b>Message:</b> ${escapeHtml(message)}\n`;

    text += `🌐 ${escapeHtml(locale ?? "")}  ·  ${escapeHtml(source ?? "")}`;

    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!tgRes.ok) {
      const errText = await tgRes.text().catch(() => "");
      console.error("Telegram sendMessage failed:", tgRes.status, errText);
      return Response.json(
        { ok: false, error: "telegram_failed" },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Lead route error:", e);
    return Response.json({ ok: false, error: "server" }, { status: 500 });
  }
}