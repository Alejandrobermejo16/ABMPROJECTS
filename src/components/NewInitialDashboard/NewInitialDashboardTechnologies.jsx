import React from "react";
import '../../styles/NewInitialDashboardTechnologies.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { LENGUAJESDEPROGRAMACION, FRAMEWORKS, OTROS, LIBRERIAS } from "../../Constants";

// Componente reutilizable para los gráficos
const CustomBarChart = ({ data, dataKey, colorKey }) => (
  <ResponsiveContainer width="80%" height={300}> 
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry[colorKey]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const NewInitialDashboardTechnologies = () => {
  return (
    <div className="divTech">
      <div className="title-container">
        <h1>Tecnologías que Impulsan Mi Trabajo</h1>
      </div>
      <CustomBarChart data={LENGUAJESDEPROGRAMACION} dataKey="nivel_Lenguaje" colorKey="color" />
      <CustomBarChart data={FRAMEWORKS} dataKey="nivel_FrameWork" colorKey="color" />
      <CustomBarChart data={OTROS} dataKey="otros" colorKey="color" />
      <CustomBarChart data={LIBRERIAS} dataKey="nivel_Libreria" colorKey="color" />
    </div>
  );
};

export default NewInitialDashboardTechnologies;
