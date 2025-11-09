"use client";
import { useMemo } from "react";

export default function QuantityInput({
  value,
  onChange,
  unit,
  allowDecimal,
  step = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  unit: string;
  allowDecimal: boolean;
  step?: number;
}) {
  const display = useMemo(
    () => (Number.isFinite(value) && value > 0 ? String(value) : ""),
    [value]
  );

  const parse = (raw: string) => {
    const v = raw.replace(",", ".").trim();
    if (v === "") return 0;
    const num = parseFloat(v);
    if (Number.isNaN(num) || num < 0) return 0;
    return allowDecimal ? num : Math.round(num);
  };

  const applyStep = (dir: 1 | -1) => {
    const next = Math.max(0, (value || 0) + dir * step);
    const rounded = allowDecimal ? Number(next.toFixed(3)) : Math.round(next);
    onChange(rounded);
  };

  const quickValues = allowDecimal ? [0.1, 0.25, 0.5] : [];

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="btn px-2"
          onClick={() => applyStep(-1)}
          aria-label="minus"
        >
          –
        </button>
        <input
          className="input w-24 text-right"
          inputMode="decimal"
          placeholder={allowDecimal ? "0.0" : "0"}
          value={display}
          onChange={(e) => onChange(parse(e.target.value))}
        />
        <button
          type="button"
          className="btn px-2"
          onClick={() => applyStep(1)}
          aria-label="plus"
        >
          +
        </button>
        <span className="badge">{unit}</span>
      </div>

      {quickValues.length > 0 && (
        <div className="flex gap-1">
          {quickValues.map((q) => (
            <button
              key={q}
              type="button"
              className="btn text-xs bg-slate-100 hover:bg-slate-200"
              onClick={() => onChange(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
