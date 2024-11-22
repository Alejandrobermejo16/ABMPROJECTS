import React, { useState, useRef, useEffect } from "react";
import "../styles/SectionNotesSchool.css";

const SectionNotesSchool = () => {
  const [notes, setNotes] = useState(""); // Estado para manejar el contenido
  const editableRef = useRef(null); // Referencia al div contenteditable
  const [cursorPos, setCursorPos] = useState(null); // Estado para guardar la posición del cursor

  // Función para actualizar el estado cuando el contenido cambia
  const handleChange = () => {
    setNotes(editableRef.current.innerHTML); // Usamos innerHTML para incluir texto y elementos HTML
  };

  // Función para manejar el pegado de imágenes
  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf("image") === 0) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = document.createElement("img");
          img.src = event.target.result;
          img.style.maxWidth = "100%"; // Ajusta el tamaño de la imagen
          img.style.display = "block";
          img.style.margin = "10px 0";
          // Insertamos la imagen directamente en el div
          editableRef.current.appendChild(img);
        };
        reader.readAsDataURL(file);
        event.preventDefault(); // Evitar que se pegue texto plano
      }
    }
  };

  // Función para manejar la posición del cursor al hacer clic
  const handleMouseClick = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0); // Obtener el rango actual del cursor

    const position = range.startOffset; // La posición actual del cursor en el contenido
    setCursorPos(position); // Guardar la posición
  };

  // Función para colocar el cursor al final del contenido
  const setCursorToEnd = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    const div = editableRef.current;

    if (div) {
      // Coloca el cursor al final del contenido
      const lastChild = div.lastChild;
      if (lastChild) {
        range.selectNodeContents(lastChild);
        range.collapse(false); // Colapsa el rango para que el cursor quede al final
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // Función para colocar el cursor en una posición específica
const setCursorAtPosition = () => {
  const selection = window.getSelection();
  const range = document.createRange();
  const div = editableRef.current;

  if (div && cursorPos !== null) {
    const textNode = div.firstChild; // Suponiendo que todo el contenido está dentro de un único nodo de texto
    if (textNode) {
      const newCursorPos = cursorPos; // Incrementamos la posición del cursor en 1
      range.setStart(textNode, newCursorPos); // Establece la nueva posición del cursor
      range.setEnd(textNode, newCursorPos); // Asegura que el rango de selección esté en la misma posición
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
};


  // Efecto para colocar el cursor al final por defecto cuando el componente se monta o cambia el contenido
  useEffect(() => {
    if (cursorPos === null || cursorPos === 0) {
      setCursorToEnd(); // Si no se ha movido el cursor, lo coloca al final
    } else {
      setCursorAtPosition(); // Si se ha movido el cursor, lo coloca en la posición guardada
    }
  }, [notes, cursorPos]); // Se ejecuta cuando 'notes' o 'cursorPos' cambian

  // Efecto para mantener la posición del cursor al hacer clic
  useEffect(() => {
    const div = editableRef.current;

    // Asignamos un event listener para actualizar la posición del cursor al hacer clic
    if (div) {
      div.addEventListener('click', handleMouseClick);

      // Limpiamos el event listener cuando el componente se desmonta
      return () => {
        div.removeEventListener('click', handleMouseClick);
      };
    }
  }, []);

  return (
    <div className="notesMenu">
      <div
        ref={editableRef}
        className="notesTextarea"
        contentEditable
        onInput={handleChange} // Actualiza el estado cuando cambia el contenido
        onPaste={handlePaste} // Maneja el pegado de imágenes
        placeholder="Escribe tu texto aquí"
        dangerouslySetInnerHTML={{ __html: notes }} // Renderiza el contenido HTML
      />
    </div>
  );
};

export default SectionNotesSchool;
