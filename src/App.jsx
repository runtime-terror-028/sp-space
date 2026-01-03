
import React, { useState } from "react";
import Menu from "./components/glassMenu/GlassMenu";
import GlassWindow from "./components/glassWindow/GlassWindow";
import "./App.scss";

export default function App() {
  const [currentPage, setPage] = useState("profile");

  return (
    <>
      <main>
      <GlassWindow className="glass-center" width="min(1200px, 92vw)" padding="1rem">
        {/* Your content goes here */}
        <h1 style={{ margin: 0 }}>Hello 👋</h1>
        <p style={{ opacity: 0.85 }}>
          Drop anything inside this window—forms, lists, dashboards, or modals.
        </p>
      </GlassWindow>
    </main>

      <div className="floating-menu-container" aria-hidden="false">
        <Menu
          ariaLabel="menu"
          options={[
            { value: "profile", label: "Profile" },
            { value: "skill", label: "Skills" },
            { value: "project", label: "Projects" },
			{ value: "social", label: "Social" },
          ]}
          value={currentPage}
          onChange={setPage}
        />
      </div>
    </>
  );
}
