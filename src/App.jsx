
import React, { useState } from "react";
import Menu from "./components/glassMenu/GlassMenu";
import { GlassListMenu, GlassButton, GlassDock } from "./components/glassElement/GlassElement";
import "./App.scss";

export default function App() {
  const [currentPage, setPage] = useState("home");

  return (
    <>
      <main>
        <h1>Page Content</h1>
        <p>bla bla bla</p>
		<GlassButton />
		<GlassDock />
		<GlassListMenu />
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
