import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/KalCalculator.css";
import axios from 'axios';

const generateHours = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hourString = i.toString().padStart(2, '0');
    hours.push(`${hourString}:00`);
    hours.push(`${hourString}:30`);
  }
  return hours;
};

function KalCalculator(props) {
  const { cal } = props;
  const [searchQuery, setSearchQuery] = useState(''); // Estado para el término de búsqueda de alimentos
  const [foodsList, setFoodsList] = useState([]); // Estado para la lista de alimentos
  const [selectedFood, setSelectedFood] = useState(null); // Estado para el alimento seleccionado
  const [exerciseQuery, setExerciseQuery] = useState(''); // Estado para el término de búsqueda de ejercicios
  const [exerciseList, setExerciseList] = useState([]); // Estado para la lista de ejercicios
  const [selectedExercise, setSelectedExercise] = useState(null); // Estado para el ejercicio seleccionado
  const [exerciseCalories, setExerciseCalories] = useState(null); // Estado para las calorías quemadas por el ejercicio
  const [exerciseDuration, setExerciseDuration] = useState(''); // Estado para la duración del ejercicio en minutos
  const [hours, setHours] = useState(generateHours()); // Estado para las horas del día

  useEffect(() => {
    if (searchQuery.length > 2) {
      const fetchFoodsList = async () => {
        try {
          const usdaApiKey = 'qt4TrBnYKdqE4BOtmvYPV7lMMIz645Hs67tHNvMP';
          const usdaUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${usdaApiKey}&query=${searchQuery}&pageSize=10`;

          const response = await axios.get(usdaUrl);
          const foods = response.data.foods;
          setFoodsList(foods);
        } catch (error) {
          console.error('Error al obtener la lista de alimentos:', error);
        }
      };

      fetchFoodsList();
    } else {
      setFoodsList([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (exerciseQuery.length > 2 && exerciseDuration > 0) {
      const fetchExerciseList = async () => {
        try {
          const nutritionixApiId = '451a4b61';
          const nutritionixApiKey = '1e9525aaccfe868e361a397b673e852f';
          const nutritionixUrl = `https://trackapi.nutritionix.com/v2/natural/exercise`;

          const response = await axios.post(nutritionixUrl, {
            query: `${exerciseQuery} for ${exerciseDuration} minutes`, // Incluir la duración en minutos en la consulta
            gender: "male", // Ajustar esto según el usuario
            weight_kg: 70, // Ajustar esto según el usuario
            height_cm: 175, // Ajustar esto según el usuario
            age: 30, // Ajustar esto según el usuario
          }, {
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': nutritionixApiId,
              'x-app-key': nutritionixApiKey
            }
          });

          const exercises = response.data.exercises;
          setExerciseList(exercises);
        } catch (error) {
          console.error('Error al obtener la lista de ejercicios:', error);
        }
      };

      fetchExerciseList();
    } else {
      setExerciseList([]);
    }
  }, [exerciseQuery, exerciseDuration]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setSearchQuery(food.description);
    setFoodsList([]);
  };

  const handleExerciseChange = (event) => {
    setExerciseQuery(event.target.value);
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setExerciseQuery(exercise.name);
    setExerciseList([]);
    setExerciseCalories(exercise.nf_calories); // Guardar las calorías quemadas por el ejercicio
  };

  const handleDurationChange = (event) => {
    setExerciseDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    console.log('Datos del formulario:', {
      selectedFood,
      selectedExercise,
      exerciseDuration
    });
  };

  return (
    <div>
      <h1>Actualmente has consumido {cal} calorías</h1>
      <div className="divFormFit">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="foodSearch">
              Alimento Ingerido
            </Form.Label>
            <Form.Control
              type="text"
              id="foodSearch"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Introduce el nombre de un alimento"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ingestionTime">
              Hora en la que se ingiere
            </Form.Label>
            <Form.Select id="ingestionTime">
              <option value="">Selecciona la hora</option>
              {hours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="exerciseSearch">
              Actividad Realizada
            </Form.Label>
            <Form.Control
              type="text"
              id="exerciseSearch"
              value={exerciseQuery}
              onChange={handleExerciseChange}
              placeholder="Introduce el nombre de un ejercicio"
            />
            {exerciseList.length > 0 && (
              <ul className="exerciseList">
                {exerciseList.map(exercise => (
                  <li key={exercise.tag_id} onClick={() => handleExerciseClick(exercise)}>
                    {exercise.name} - {exercise.nf_calories} cal
                  </li>
                ))}
              </ul>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="exerciseDuration">
              Duración del Ejercicio (en minutos)
            </Form.Label>
            <Form.Control
              type="number"
              id="exerciseDuration"
              value={exerciseDuration}
              onChange={handleDurationChange}
              placeholder="Introduce la duración en minutos"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="activityTime">
              Hora en la que se realiza
            </Form.Label>
            <Form.Select id="activityTime">
              <option value="">Selecciona la hora</option>
              {hours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button type="submit">Enviar</Button>
        </Form>
      </div>
    </div>
  );
}

export default KalCalculator;
