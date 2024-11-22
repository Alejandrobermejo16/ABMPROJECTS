import React from "react";
import '../styles/School.css';
import 'abm-components/src/page-es/abm-glass-filter/src/abm-glass-filter';
import SectionFilterSchool from '../components/SectionFilterSchool';
import SectionNotesSchool from '../components/SectionNotesSchool';

class School extends React.Component {
  render() {
    return (
      <div className="div-scrolling">
        <header className="header">
          <h1 className="h1header">ABM SCHOOL</h1>
          <abm-glass-filter searchValue="prueba"></abm-glass-filter>
        </header>
        <main className="main-content">
          <SectionFilterSchool />
          <SectionNotesSchool />
        </main>

      </div>
    );
  }
}

export default School;

