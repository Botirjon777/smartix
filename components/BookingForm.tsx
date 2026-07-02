"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { submitLead } from "@/lib/leads";
import { site } from "@/lib/site";
import { CheckIcon, CloseIcon, TelegramIcon, ArrowRightIcon } from "./icons";

type Status = "idle" | "sending" | "success" | "error";

export default function BookServiceButton({
  projectName,
  projectSlug,
}: {
  projectName: string;
  projectSlug: string;
}) {
  const { dict, locale } = useI18n();
  const t = dict.projects.booking;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  // Lock body scroll + handle Escape while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    // Reset after the modal is dismissed so it's fresh next time.
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", phone: "", message: "" });
    }, 150);
  }

  function update(key: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm((s) => ({ ...s, [key]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await submitLead({
      type: "booking",
      name: form.name,
      phone: form.phone,
      message: form.message,
      project: projectName || projectSlug,
      locale,
      source: "project-detail",
    });
    setStatus(res.ok ? "success" : "error");
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-brand/60";
  const labelCls = "mb-1.5 block text-xs font-medium text-muted";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:shadow-brand/50"
      >
        <TelegramIcon className="h-4 w-4" />
        {dict.projects.book}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.title}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label={dict.projects.back}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line bg-fill text-muted transition hover:border-line-strong hover:bg-fill-strong hover:text-foreground"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
                  <CheckIcon className="h-7 w-7" />
                </div>
                <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-foreground">
                  {t.success}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-fill px-6 py-3 text-sm font-semibold text-foreground transition hover:border-line-strong hover:bg-fill-strong"
                >
                  {dict.projects.back}
                </button>
              </div>
            ) : (
              <>
                <h2 className="pr-10 text-lg font-bold text-foreground sm:text-xl">
                  {t.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t.subtitle}
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4 text-left">
                  <div>
                    <label className={labelCls} htmlFor="bk-name">
                      {t.name}
                    </label>
                    <input
                      id="bk-name"
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder={t.namePh}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="bk-phone">
                      {t.phone}
                    </label>
                    <input
                      id="bk-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder={t.phonePh}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="bk-message">
                      {t.message}
                    </label>
                    <textarea
                      id="bk-message"
                      rows={3}
                      value={form.message}
                      onChange={update("message")}
                      placeholder={t.messagePh}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-rose-600 dark:text-rose-300">
                      {t.error}{" "}
                      <a
                        href={site.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-2 hover:text-foreground"
                      >
                        {site.telegramHandle}
                      </a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:shadow-brand/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? t.sending : t.submit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}