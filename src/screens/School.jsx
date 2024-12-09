import React, { useState } from "react";
import "../styles/School.css";
import "abm-components/src/page-es/abm-glass-filter/src/abm-glass-filter";
import SectionFilterSchool from "../components/SectionFilterSchool";
import SectionNotesSchool from "../components/SectionNotesSchool";

const School = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSectionSelect = (section) => {
    setSelectedSection(section); // Actualiza la sección seleccionada
  };

  return (
    <div className="div-scrolling">
      <header className="header">
        <h1 className="h1header">ABM SCHOOL</h1>
        <abm-glass-filter searchValue="prueba"></abm-glass-filter>
      </header>
      <main className="main-content">
        <SectionFilterSchool onSectionSelect={handleSectionSelect} />
        <SectionNotesSchool selectedSection={selectedSection} />
      </main>
    </div>
  );
};

export default School;
