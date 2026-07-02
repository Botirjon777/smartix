"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "./icons";

export type SelectOption = { value: string; label: string };

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  id,
  invalid = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  id?: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (open) {
      const i = options.findIndex((o) => o.value === value);
      setActive(i >= 0 ? i : 0);
    }
  }, [open, value, options]);

  function commit(i: number) {
    const opt = options[i];
    if (opt) {
      onChange(opt.value);
      setOpen(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(active);
        break;
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-activedescendant={
          open && active >= 0 ? `${baseId}-opt-${active}` : undefined
        }
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-background/60 px-4 py-3 text-left text-sm outline-none transition focus:border-brand/60 ${
          invalid
            ? "border-rose-500/70"
            : open
              ? "border-brand/60"
              : "border-line hover:border-line-strong"
        } ${selected ? "text-foreground" : "text-muted"}`}
      >
        <span className="truncate">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-line bg-surface-2 p-1.5 shadow-2xl"
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            const isActive = i === active;
            return (
              <li
                key={o.value}
                id={`${baseId}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(i)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-fill-strong text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className="truncate">{o.label}</span>
                {isSelected && (
                  <CheckIcon className="h-4 w-4 shrink-0 text-brand" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}