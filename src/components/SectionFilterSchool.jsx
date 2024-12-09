import React, { useState, useEffect } from "react";
import "../styles/SectionFilterSchool.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const SectionFilterSchool = ({ onSectionSelect }) => {
  const [openModal, setOpenModal] = useState(false);
  const [valueInputAddSection, setValueInputAddSection] = useState("");
  const [sections, setSections] = useState([]); 


  const handleSectionClick = (section) => {
    onSectionSelect(section); // Notifica al padre la sección seleccionada
  };

  // gets the sections and sorts them
  const fetchSections = () => {
    fetch("https://backendabmprojects.vercel.app/api/users/getSections")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las secciones");
        }
        return response.json(); // Convierte la respuesta en JSON
      })
      .then((data) => {
        const sections = data.sections.map(item => item.Sections).filter(section => section);
        let orderSections = sections.sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );
        setSections(orderSections);
      })
      .catch((error) => {
        console.error("Error al obtener las secciones:", error);
      });
  };

  // Hook para llamar al método fetchSections al montar el componente
  useEffect(() => {
    fetchSections();
  }, []);

  const addNewSection = () => {
    // Añadir la nueva sección en el backend
    fetch("https://backendabmprojects.vercel.app/api/users/createNewSection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderSections: valueInputAddSection }), // Enviamos el objeto correctamente
    })
      .then((response) => {
        if (response.status === 409) {
          console.error("Sección duplicada");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sección añadida correctamente:", data);
        fetchSections(); // Vuelve a obtener las secciones después de añadir una nueva
      })
      .catch((error) => {
        console.error("Error al añadir la sección:", error);
      });
      closeModalAddNewSection();
  };

  const openModalAddNewSection = () => {
    setOpenModal(true);
  };

  const closeModalAddNewSection = () => {
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    setValueInputAddSection(event.target.value);
  };

  return (
    <div className="sectionPanel">
    <div className="menu">
      <div className="enlaces">
      <ul>
            {sections.map((section, index) => (
              <li key={index}>
                <a href="#" onClick={() => handleSectionClick(section)}>
                  {section}
                </a>
              </li>
            ))}
          </ul>
      </div>
      <div className="footer">
        <button
          onClick={openModalAddNewSection}
          className="addNewSectionButton"
        >
          Añadir nueva sección
        </button>
      </div>
    </div>
    {openModal && (
  <Modal show={openModal} onHide={closeModalAddNewSection}>
    <Modal.Header closeButton onHide={closeModalAddNewSection}>
      <Modal.Title style={{ color: "blue" }}>
        Añade una sección
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form.Control
        value={valueInputAddSection}
        onChange={handleInputChange}
        as="textarea"
        placeholder="Escribe aquí el nombre de la nueva sección"
      />
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={closeModalAddNewSection} variant="secondary">
        Cerrar
      </Button>
      <Button variant="primary" onClick={addNewSection}>
        Añadir
      </Button>
    </Modal.Footer>
  </Modal>
)}

  </div>
  
  );
};

export default SectionFilterSchool;
