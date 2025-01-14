import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../styles/SectionNotesSchool.css";

const SectionNotesSchool = ({ selectedSection }) => {
  const editableRef = useRef(null);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [currentSection, setCurrentSection] = useState(selectedSection);

  // Update `the section` only if `selectedSection` changes
  useEffect(() => {
    setCurrentSection(selectedSection);
  }, [selectedSection]);

  const fetchSections = useCallback(() => {
    if (!selectedSection) return;

    if (selectedSection !== currentSection) {
      const url = new URL(
        "https://backendabmprojects.vercel.app/api/users/getContent"
      );
      url.searchParams.append("orderSections", selectedSection);

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener las secciones");
          }
          return response.json();
        })
        .then((data) => {
          if (data.content) {
            // Usa DOMParser para parsear el contenido HTML y evitar problemas con caracteres especiales
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.content, "text/html");
            editableRef.current.innerHTML = doc.body.innerHTML;
            setCurrentSection(data.selectedSection);
          } else {
            editableRef.current.innerHTML = "";
          }
        })
        .catch((error) => {
          console.error("Error al obtener las secciones:", error);
        });
    }
  }, [selectedSection, currentSection]);

  // Function to save the content to the database
  const saveContent = useCallback(() => {
    const contentSave = editableRef.current.innerHTML;
    fetch(
      "https://backendabmprojects.vercel.app/api/users/updateSectionContent",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderSections: selectedSection, contentSave }),
      }
    )
      .then((response) => {
        if (response.status === 409) {
          console.error("Sección duplicada");
        }
        return response.json();
      })
      .then((data) => {
        setHasPendingChanges(false);
      })
      .catch((error) => {
        console.error("Error al guardar los datos en la sección:", error);
      });
  }, [selectedSection]);

  const handleChange = () => {
    setHasPendingChanges(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      if (hasPendingChanges) {
        saveContent();
      }
    }, 2000);
    setTimeoutId(newTimeoutId);
  };

  // Handles pasting of images
  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
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

          // Marca que hay cambios pendientes
          setHasPendingChanges(true);

          // Reinicia el temporizador para guardar cambios automáticamente
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          // Establece un nuevo temporizador para guardar automáticamente después de 2 segundos
          const newTimeoutId = setTimeout(() => {
            if (hasPendingChanges) {
              saveContent();
              setHasPendingChanges(false); // Resetea los cambios pendientes después de guardar
            }
          }, 2000); // Ajusta según tus necesidades
          setTimeoutId(newTimeoutId);
        };
        reader.readAsDataURL(file);
        event.preventDefault();
      }
    }
  };

  // Set an interval to automatically save changes
  useEffect(() => {
    if (selectedSection) {
      fetchSections();
    }
  }, [selectedSection, fetchSections, timeoutId]);

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
