import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/SectionNotesSchool.css";

const SectionNotesSchool = ({ selectedSection }) => {
  const editableRef = useRef(null);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

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

  // Función para guardar el contenido en la base de datos
  const saveContent = useCallback(() => {
    console.log(selectedSection, "prueba de seccion");
    const contentSave = editableRef.current.innerHTML;    
    fetch("https://backendabmprojects.vercel.app/api/users/updateSectionContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderSections: selectedSection, contentSave }),
    })
      .then((response) => {
        if (response.status === 409) {
          console.error("Sección duplicada");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos añadidos correctamente:", data);
        setHasPendingChanges(false); // Resetea el estado
      })
      .catch((error) => {
        console.error("Error al guardar los datos en la sección:", error);
      });
  }, [selectedSection]); // Dependencia de `selectedSection`

  // Maneja el cambio de texto en el área editable
  const handleChange = () => {
    setHasPendingChanges(true); // Marca que hay cambios pendientes

    // Resetea el temporizador si ya existe
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Establece un nuevo temporizador para guardar después de 2 segundos de inactividad
    const newTimeoutId = setTimeout(() => {
      if (hasPendingChanges) {
        saveContent();
      }
    }, 2000); // 2 segundos
    setTimeoutId(newTimeoutId);
  };

  // Maneja el pegado de imágenes
  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf("image") === 0) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = document.createElement("img");
          img.src = event.target.result;
          img.style.maxWidth = "100%";
          img.style.display = "block";
          img.style.margin = "10px 0";
          editableRef.current.appendChild(img);
        };
        reader.readAsDataURL(file);
        event.preventDefault();
      }
    }
  };

  // Configura un intervalo para guardar automáticamente los cambios
  useEffect(() => {
    return () => clearTimeout(timeoutId); // Limpia el temporizador al desmontar el componente
  }, [timeoutId]);

  return (
    <div className="notesMenu">
      <div
        ref={editableRef}
        className="notesTextarea"
        contentEditable
        onInput={handleChange}
        onPaste={handlePaste}
        placeholder="Escribe tu texto aquí"
      />
    </div>
  );
};

export default SectionNotesSchool;
