"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { site } from "@/lib/site";
import { submitLead } from "@/lib/leads";
import Select from "./Select";
import { TelegramIcon, CheckIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "fallback";

export default function ContactForm() {
  const { dict, locale } = useI18n();
  const f = dict.cta.form;
  const [status, setStatus] = useState<Status>("idle");
  const [typeError, setTypeError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
    problem: "",
  });

  const typeEntries = Object.entries(f.types) as [
    keyof typeof f.types,
    string,
  ][];

  function update(key: keyof typeof form) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => setForm((s) => ({ ...s, [key]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.type) {
      setTypeError(true);
      return;
    }
    setStatus("sending");
    const typeLabel = f.types[form.type as keyof typeof f.types] || form.type;

    const res = await submitLead({
      type: "contact",
      name: form.name,
      phone: form.phone,
      projectType: typeLabel,
      message: form.problem,
      locale,
      source: "homepage-contact",
    });

    if (res.ok) {
      setStatus("sent");
      return;
    }

    // Fallback: copy details to clipboard and open Telegram to paste manually.
    const msg = `🆕 SmartIX\n\n👤 ${form.name}\n📞 ${form.phone}\n🏷 ${typeLabel}\n📝 ${form.problem}`;
    try {
      await navigator.clipboard.writeText(msg);
    } catch {}
    window.open(site.telegram, "_blank", "noopener,noreferrer");
    setStatus("fallback");
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-brand/60 focus:bg-background";
  const labelCls = "mb-1.5 block text-xs font-medium text-muted";

  if (status === "sent" || status === "fallback") {
    return (
      <div className="w-full rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.07] p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-400/15 text-emerald-500 dark:text-emerald-300">
          <CheckIcon className="h-6 w-6" />
        </div>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground">
          {status === "sent" ? f.received : f.success}
        </p>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30"
        >
          <TelegramIcon className="h-4 w-4" />
          {site.telegramHandle}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="cf-name">
            {f.name}
          </label>
          <input
            id="cf-name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder={f.namePh}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="cf-phone">
            {f.phone}
          </label>
          <input
            id="cf-phone"
            type="tel"
            required
            value={form.phone}
            onChange={update("phone")}
            placeholder={f.phonePh}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="cf-type">
          {f.type}
        </label>
        <Select
          id="cf-type"
          value={form.type}
          onChange={(v) => {
            setForm((s) => ({ ...s, type: v }));
            setTypeError(false);
          }}
          options={typeEntries.map(([key, label]) => ({ value: key, label }))}
          placeholder={f.typePh}
          invalid={typeError}
        />
        {typeError && (
          <p className="mt-1.5 text-xs text-rose-500 dark:text-rose-400">
            {f.required}
          </p>
        )}
      </div>

      <div>
        <label className={labelCls} htmlFor="cf-problem">
          {f.problem}
        </label>
        <textarea
          id="cf-problem"
          required
          rows={4}
          value={form.problem}
          onChange={update("problem")}
          placeholder={f.problemPh}
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-2 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand/30 transition hover:shadow-brand/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <TelegramIcon className="h-4 w-4" />
        {status === "sending" ? f.sending : f.submit}
      </button>
    </form>
  );
}