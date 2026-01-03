
// GlassWindow.jsx
import React from "react";
import "./GlassWindow.scss";

const GlassWindow = ({
  children,
  className = "",
  width = "min(800px, 90vw)",
  height = "auto",
  padding = "1rem",
  ariaLabel = "Glass window",
}) => {
  return (
    <section
      className={`glass-window ${className}`}
      style={{ width, height, padding }}
      role="region"
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
};

export default GlassWindow;
