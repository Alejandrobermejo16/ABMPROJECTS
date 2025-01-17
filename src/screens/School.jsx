import React, { useState } from "react";
import "../styles/School.css";
import "abm-components/src/page-es/abm-glass-filter/src/abm-glass-filter";
import SectionFilterSchool from "../components/School/SectionFilterSchool";
import SectionNotesSchool from "../components/School/SectionNotesSchool";

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

      <div className="footerheader">
        <button class="common-button">H1</button>
        <button class="common-button">Negrita</button>
        <button class="common-button">Cursiva</button>
        </div>
      </header>
      <main className="main-content">
        <SectionFilterSchool onSectionSelect={handleSectionSelect} />
        <SectionNotesSchool selectedSection={selectedSection} />
      </main>
    </div>
  );
};

export default School;
