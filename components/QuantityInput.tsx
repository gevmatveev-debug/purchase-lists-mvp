"use client";
import { useMemo } from "react";

export default function QuantityInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const display = useMemo(() => (Number.isFinite(value) ? String(value) : ""), [value]);
  return (
    <input
      className="input w-28 text-right"
      inputMode="decimal"
      placeholder="0"
      value={display}
      onChange={(e) => {
        const v = e.target.value.replace(",", ".");
        const num = parseFloat(v);
        if (Number.isNaN(num)) onChange(0);
        else onChange(num);
      }}
    />
  );
}
