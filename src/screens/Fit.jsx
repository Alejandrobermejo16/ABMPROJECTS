import React, { useState, useEffect } from 'react';
import CalendarioPrincipal from '../helpers/Calendar';
import KalCalculator from '../components/KalCalculator';
import '../styles/Fit.css';
import axios from 'axios';

const Fit = () => {
  const [nutritionInfo, setNutritionInfo] = useState(null); // Nuevo estado para la info nutricional

  // const [loadScreen, setLoadScreen] = useState('');
  useEffect(() => {
    // Hacer la llamada a la API de Nutritionix al montar el componente
    const fetchNutritionInfo = async () => {
      try {
        const foodItem = 'apple'; // Alimento en inglés

        // Llamada a la API de Nutritionix
        const nutritionixApiId = '451a4b61';
        const nutritionixApiKey = '1e9525aaccfe868e361a397b673e852f';
        const nutritionixUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

        const nutritionResponse = await axios.post(
          nutritionixUrl,
          { query: foodItem },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': nutritionixApiId,
              'x-app-key': nutritionixApiKey
            }
          }
        );

        // Actualizar el estado con la información nutricional
        setNutritionInfo(nutritionResponse.data.foods[0]);
      } catch (error) {
        console.error('Error al obtener información nutricional:', error);
      }
    };

    fetchNutritionInfo();
  }, []); // El array vacío asegura que esto se ejecute solo una vez cuando el componente se monta

  return (
    <div className='abmfitprincipal'>
      <h1>¡Bienvenido a ABM FIT!</h1>
      <CalendarioPrincipal />
      <KalCalculator cal={70} />
      {nutritionInfo && (
        <div>
          <h3>Información Nutricional</h3>
          <p>Nombre del alimento: {nutritionInfo.food_name}</p>
          <p>Calorías: {nutritionInfo.nf_calories}</p>
          <p>Grasas: {nutritionInfo.nf_total_fat}</p>
          <p>Carbohidratos: {nutritionInfo.nf_total_carbohydrate}</p>
          <p>Proteínas: {nutritionInfo.nf_protein}</p>
          {/* Muestra más información según tus necesidades */}
        </div>
      )}
    </div>
  );
}

export default Fit;