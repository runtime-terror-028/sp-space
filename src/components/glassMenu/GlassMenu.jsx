
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./GlassMenu.scss";

export default function GlassMenu({
  className,
  options = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "dim", label: "Dim" },
  ],
  defaultValue,
  value,
  onChange,
  ariaLabel = "Switcher",
}) {
  const isControlled = value !== undefined;
  const firstValue = options[0]?.value ?? "option-1";
  const [selected, setSelected] = useState(isControlled ? value : (defaultValue ?? firstValue));

  // keep internal in sync for controlled usage
  useEffect(() => {
    if (isControlled) setSelected(value);
  }, [isControlled, value]);

  const containerRef = useRef(null);
  const optionRefs = useMemo(() => options.map(() => React.createRef()), [options]);

  // capsule style (CSS vars): translateX and width
  const [capsuleVars, setCapsuleVars] = useState({ x: 0, w: 0 });

  const capsulePad = 4; // sync with SCSS var --capsule-pad

  const recalcCapsule = () => {
    const container = containerRef.current;
    const idx = options.findIndex((o) => o.value === selected);
    const optEl = optionRefs[idx]?.current;
    if (!container || !optEl) return;

    const contRect = container.getBoundingClientRect();
    const optRect = optEl.getBoundingClientRect();

    // Distance from container's left border to option's left
    const leftDistance = optRect.left - contRect.left;

    // Our capsule is positioned with "left: var(--capsule-pad)". Translate from that base.
    const x = leftDistance - capsulePad;
    const w = optEl.offsetWidth;

    setCapsuleVars({ x, w });
  };

  // recalc on mount, selection change, window resize
  useEffect(() => {
    recalcCapsule();
    const onResize = () => recalcCapsule();
    window.addEventListener("resize", onResize);
    // Recalc once fonts are ready (typography can affect button widths)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(recalcCapsule).catch(() => {});
    }
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, options]);

  const handleSelect = (val) => {
    if (!isControlled) setSelected(val);
    if (onChange) onChange(val);
  };

  // Keyboard navigation across N options
  const onKeyDown = (e) => {
    const order = options.map((o) => o.value);
    const idx = order.indexOf(selected);
    if (e.key === "ArrowRight") {
      handleSelect(order[(idx + 1) % order.length]);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      handleSelect(order[(idx - 1 + order.length) % order.length]);
      e.preventDefault();
    } else if (e.key === "Home") {
      handleSelect(order[0]);
      e.preventDefault();
    } else if (e.key === "End") {
      handleSelect(order[order.length - 1]);
      e.preventDefault();
    }
  };

  return (
    <fieldset
      ref={containerRef}
      className={`switcher${className ? ` ${className}` : ""}`}
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      <legend className="switcher__legend">{ariaLabel}</legend>

      {/* Backdrop filter hook for Safari/Chrome (url(#switcher)) */}
      <svg className="switcher__filter" aria-hidden="true" focusable="false">
        <filter id="switcher">
          <feColorMatrix type="saturate" values="1" />
        </filter>
      </svg>

      {/* Moving capsule (sized and positioned dynamically) */}
      <div
        className="switcher__capsule"
        style={{
          // Use CSS variables so SCSS keeps control of visuals & transitions
          "--capsule-x": `${capsuleVars.x}px`,
          "--capsule-w": `${capsuleVars.w}px`,
        }}
      />

      {/* Options */}
      {options.map((opt, i) => (
        <label
          key={opt.value}
          ref={optionRefs[i]}
          className="switcher__option"
          aria-label={opt.label}
        >
          <input
            className="switcher__input"
            type="radio"
            name="switcher"
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => handleSelect(opt.value)}
            aria-checked={selected === opt.value}
          />
          <span className="switcher__text">{opt.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
