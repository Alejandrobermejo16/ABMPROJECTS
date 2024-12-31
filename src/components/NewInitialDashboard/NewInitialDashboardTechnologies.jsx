import React, { useState, useEffect } from "react";
import '../../styles/NewInitialDashboardTechnologies.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { LENGUAJESDEPROGRAMACION, FRAMEWORKS, OTROS, LIBRERIAS } from "../../Constants";


// Componente reutilizable para los gráficos
const CustomBarChart = ({ data, dataKey, colorKey }) => (
  <BarChart  width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis  dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey={dataKey}>
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry[colorKey]} />
      ))}
    </Bar>
  </BarChart>
);

const NewInitialDashboardTechnologies = () => {
  const [loadingSkills, setLoadingSkills] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingSkills(false);
    }, 1000);
  }, []);

  return (
    <div className="divSkills">
      {loadingSkills ? (
        <div>Cargando...</div>
      ) : (
        <div className="divTech">
          <div className="title-container">
            <h1>Tecnologías que Impulsan Mi Trabajo</h1>
          </div>
          <CustomBarChart data={LENGUAJESDEPROGRAMACION} dataKey="nivel_Lenguaje" colorKey="color" />
          <CustomBarChart data={FRAMEWORKS} dataKey="nivel_FrameWork" colorKey="color" />
          <CustomBarChart data={OTROS} dataKey="otros" colorKey="color" />
          <CustomBarChart data={LIBRERIAS} dataKey="nivel_Libreria" colorKey="color" />
        </div>
      )}
    </div>
  );
};

export default NewInitialDashboardTechnologies;
