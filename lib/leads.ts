// Shared lead payload contract used by both the contact form and the
// project booking form. The client helper POSTs to /api/lead, which forwards
// the message to the SmartIX Telegram group via the bot.

export type LeadType = "contact" | "booking";

export type LeadPayload = {
  type: LeadType;
  name: string;
  phone: string;
  /** contact form: selected problem type label */
  projectType?: string;
  /** free-text message / problem description */
  message?: string;
  /** booking: project name or slug */
  project?: string;
  /** current UI locale, for context in the Telegram message */
  locale?: string;
  /** page the lead came from */
  source?: string;
};

export type LeadResult = { ok: boolean; error?: string };

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network" };
  }
}