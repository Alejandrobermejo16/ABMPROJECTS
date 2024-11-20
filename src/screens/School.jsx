import React from "react";
import '../styles/School.css';
import 'abm-components/src/page-es/abm-glass-filter/src/abm-glass-filter';
import SectionFilterSchool from '../components/SectionFilterSchool';

class School extends React.Component {
  render() {
    return (
      <div className="div-scrolling">
        <header className="header" style={{ backgroundColor: "blue", width: '100%' }}>
          <h1 className="h1header">ABM SCHOOL</h1>
          <abm-glass-filter searchValue="prueba"></abm-glass-filter>
        </header>
        <SectionFilterSchool />
      </div>
    );
  }
}

export default School;
