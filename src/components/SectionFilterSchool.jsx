import React, { useState, useEffect } from "react";
import "../styles/SectionFilterSchool.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const SectionFilterSchool = () => {
  const [openModal, setOpenModal] = useState(false);
  const [valueInputAddSection, setValueInputAddSection] = useState("");
  const [sections, setSections] = useState([]); // Estado para almacenar las secciones

  // Método para obtener las secciones del backend
  const fetchSections = () => {
    fetch("https://backendabmprojects.vercel.app/api/users/getSections")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las secciones");
        }
        return response.json();
      })
      .then((data) => {
        setSections(data); // Actualiza el estado con las secciones obtenidas
      })
      .catch((error) => {
        console.error("Error al obtener las secciones:", error);
      });
  };

  // Hook para llamar al método fetchSections al montar el componente
  useEffect(() => {
    fetchSections();
  }, []);

  const addNewSection = ({ secciones }) => {
    secciones.push(valueInputAddSection); // Usa el valor del input
    let orderSections = secciones.sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
    fetch("https://backendabmprojects.vercel.app/api/users/createUserBank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderSections),
    })
      .then((response) => {
        if (response.status === 409) {
          console.error("Sección duplicada");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sección añadida correctamente:", data);
        fetchSections(); // Vuelve a obtener las secciones actualizadas
      })
      .catch((error) => {
        console.error("Error al añadir la sección:", error);
      });
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
        <ul>
          {sections.map((section, index) => (
            <li key={index}>
              <a href="#">{section}</a>
            </li>
          ))}
        </ul>
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
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
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
              <Button
                variant="primary"
                onClick={() => addNewSection({ secciones: sections })}
              >
                Añadir
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
};

export default SectionFilterSchool;
