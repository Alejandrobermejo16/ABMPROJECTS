import React, { useState, useRef } from "react";
import "../styles/SectionNotesSchool.css";

const SectionNotesSchool = () => {
  const [, setNotes] = useState("");
  const editableRef = useRef(null);

  // update notes in the div
  const handleChange = () => {
    setNotes(editableRef.current.innerHTML);
  };

  //save content to the database
  const saveContent = () => {
    const contentSave = editableRef.current.innerHTML;
    console.log(contentSave);
    debugger;
  };

  // handles pasting of images
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
        };
        reader.readAsDataURL(file);
        event.preventDefault();
      }
    }
  };

  return (
    <div className="notesMenu">
      <div
        ref={editableRef}
        className="notesTextarea"
        contentEditable
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder="Escribe tu texto aquí"
      />
    </div>
  );
};

export default SectionNotesSchool;
