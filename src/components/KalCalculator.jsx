import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../styles/KalCalculator.css";

// Función para generar horas
const generateHours = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hourString = i.toString().padStart(2, "0");
    hours.push(`${hourString}:00`);
    hours.push(`${hourString}:30`);
  }
  return hours;
};

// Función debounce para retrasar la ejecución de llamadas
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}

function KalCalculator(props) {
  const { cal, onSubmit, CalMonth } = props;
  const [foodValue, setFoodValue] = useState(""); // Estado para el valor del input de alimentos
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda de alimentos (con debounce)
  const [selectedFood, setSelectedFood] = useState(null); // Estado para el alimento seleccionado
  const [exerciseQuery, setExerciseQuery] = useState(""); // Estado para el término de búsqueda de ejercicios
  const [exerciseCalories, setExerciseCalories] = useState(null); // Estado para las calorías quemadas por el ejercicio
  const [exerciseDuration, setExerciseDuration] = useState(""); // Estado para la duración del ejercicio en minutos
  const [hours] = useState(generateHours()); // Estado para las horas del día
  const [hourFood, setHourFood] = useState("");
  const [hourExercise, setHourExercise] = useState("");

  // Función debounce para actualizar el término de búsqueda
  const debouncedSetSearchTerm = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 500), // Retraso de 500 ms
    []
  );

  useEffect(() => {
    if (searchTerm.length > 2) {
      const fetchFoodsList = async () => {
        try {
          const usdaApiKey = "qt4TrBnYKdqE4BOtmvYPV7lMMIz645Hs67tHNvMP";
          const usdaUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${usdaApiKey}&query=${searchTerm}&pageSize=10`;

          const response = await axios.get(usdaUrl);
          const foods = response.data.foods;
          if (foods.length > 0) {
            // Obtener el primer alimento y sus calorías
            const firstFood = foods[0];
            const calories = obtenerCalorias(firstFood);
            setSelectedFood({ ...firstFood, calories });
            setFoodValue(firstFood.description);
          }
        } catch (error) {
          console.error("Error al obtener la lista de alimentos:", error);
        }
      };

      fetchFoodsList();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (exerciseQuery.length > 2 && exerciseDuration > 0) {
      const fetchExerciseList = async () => {
        try {
          const nutritionixApiId = "451a4b61";
          const nutritionixApiKey = "1e9525aaccfe868e361a397b673e852f";
          const nutritionixUrl = `https://trackapi.nutritionix.com/v2/natural/exercise`;

          const response = await axios.post(
            nutritionixUrl,
            {
              query: `${exerciseQuery} for ${exerciseDuration} minutes`, // Incluir la duración en minutos en la consulta
              gender: "male", // Ajustar esto según el usuario
              weight_kg: 70, // Ajustar esto según el usuario
              height_cm: 175, // Ajustar esto según el usuario
              age: 30, // Ajustar esto según el usuario
            },
            {
              headers: {
                "Content-Type": "application/json",
                "x-app-id": nutritionixApiId,
                "x-app-key": nutritionixApiKey,
              },
            }
          );

          const exercises = response.data.exercises;
          if (exercises.length > 0) {
            const firstExercise = exercises[0];
            setExerciseCalories(firstExercise.nf_calories);
          }
        } catch (error) {
          console.error("Error al obtener la lista de ejercicios:", error);
        }
      };

      fetchExerciseList();
    }
  }, [exerciseQuery, exerciseDuration]);

  // Función para obtener las calorías de un alimento específico
  const obtenerCalorias = (alimento) => {
    // Buscar el nutriente 'Energy' dentro de foodNutrients
    const nutrient = alimento.foodNutrients.find(
      (nutriente) => nutriente.nutrientName === "Energy"
    );
    return nutrient ? nutrient.value : "No disponible";
  };

  const handleFoodSearchChange = (event) => {
    setFoodValue(event.target.value);
    debouncedSetSearchTerm(event.target.value);
  };

  const handleExerciseSearchChange = (event) => {
    setExerciseQuery(event.target.value);
  };

  const handleExerciseDurationChange = (event) => {
    setExerciseDuration(event.target.value);
  };

  const handleFoodTimeChange = (event) => {
    setHourFood(event.target.value);
  };

  const handleExerciseTimeChange = (event) => {
    setHourExercise(event.target.value);
  };

  // Función para calcular las calorías totales de un mes sumando la de los dias de cada mes
  const calcularCaloriasTotales = (mes) => {
    if (!CalMonth[mes]) return 0;
    const dias = CalMonth[mes].days;
    const caloriasTotales = Object.values(dias).reduce((acc, dia) => acc + dia.calories, 0);
    return caloriasTotales;
  };

  const cleanData = () => {
    setFoodValue(""); 
    setSelectedFood(null); 
    setExerciseQuery(""); 
    setExerciseCalories(null); 
    setExerciseDuration(""); 
    setHourFood("");
    setHourExercise("");
  }

  const sendDataFormKal = () => {
    const data = {
      exerciseDuration,
      foodValue,
      exerciseQuery,
      hourFood,
      hourExercise,
      foodCalories: selectedFood ? selectedFood.calories : 0,
      exerciseCalories: exerciseCalories ? exerciseCalories : 0,
    };
    onSubmit(data); // Aquí asumimos que `onSubmit` es una prop recibida del componente padre

    setFoodValue(""); // Estado para el término de búsqueda de alimentos
    setSelectedFood(null); // Limpiar el alimento seleccionado
    setExerciseQuery(""); // Estado para el término de búsqueda de ejercicios
    setExerciseCalories(null); // Limpiar las calorías del ejercicio
    setExerciseDuration(""); // Estado para la duración del ejercicio en minutos
    setHourFood("");
    setHourExercise("");
  };

  // Meses del año
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", 
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const dias = ["Lunes", "Martes", "Miercoles","Jueves","Viernes","Sabado","Domingo"];

  return (
    <div>
      <h1>
        Actualmente has consumido{" "}
        <span style={{ color: cal >= 0 ? "red" : "#32CD32" }}>{cal}</span>{" "}
        calorías
      </h1>
      <div className="divFormFit">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="foodSearch">Alimento Ingerido</Form.Label>
            <Form.Control
              type="text"
              id="foodSearch"
              value={foodValue}
              onChange={handleFoodSearchChange}
              placeholder="Introduce el nombre de un alimento"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ingestionTime">
              Hora en la que se ingiere
            </Form.Label>
            <Form.Select
              id="ingestionTime"
              onChange={handleFoodTimeChange}
              value={hourFood}
            >
              <option value="">Selecciona la hora</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
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
              onChange={handleExerciseSearchChange}
              placeholder="Introduce el nombre de un ejercicio"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="exerciseDuration">
              Duración del Ejercicio (en minutos)
            </Form.Label>
            <Form.Control
              type="number"
              id="exerciseDuration"
              value={exerciseDuration}
              onChange={handleExerciseDurationChange}
              placeholder="Introduce la duración en minutos"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="activityTime">
              Hora en la que se realiza
            </Form.Label>
            <Form.Select
              id="activityTime"
              onChange={handleExerciseTimeChange}
              value={hourExercise}
            >
              <option value="">Selecciona la hora</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button type="button" onClick={sendDataFormKal}>
            Enviar
          </Button>
          <Button style={{ marginLeft: "3%" }} type="button" onClick={cleanData}>
            Limpiar
          </Button>
        </Form>
      </div>
      <h1 style={{ marginTop: "3%" }}>TABLA DE CALORIAS SEMANALES</h1>
      <div
        className="caloriasMensuales"
        style={{ marginTop: "3%", backgroundColor: "#50595C" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          <div style={{ padding: "10px", border: "2px solid #fff" }}>
            MES ACTUAL
          </div>
          <div style={{ padding: "10px", border: "2px solid #fff" }}>
            CALORÍAS MENSUALES TOTALES
          </div>
          <div style={{ padding: "10px", border: "2px solid #fff" }}>
            ÍNDICE
          </div>
        </div>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            padding: "10px",
          }}
        >
          {dias.map((dia, index) => {
            const calorias = calcularCaloriasTotales(dia);
            const indice = calorias > 0 ? "negativo" : "positivo";
            return (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                }}
              >
                <div style={{ padding: "10px", border: "2px solid #fff" }}>
                  {dia.charAt(0).toUpperCase() + dia.slice(1)}
                </div>
                <div
                  style={{
                    padding: "10px",
                    border: "2px solid #fff",
                    color: calorias > 0 ? "red" : "#32CD32",
                    fontSize: "20px",
                  }}
                >
                  {calorias}
                </div>
                <div
                  style={{
                    padding: "10px",
                    border: "2px solid #fff",
                    color: calorias > 0 ? "red" : "#32CD32",
                    fontSize: "20px",
                  }}
                >
                  {indice}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <h1 style={{ marginTop: "3%" }}>TABLA DE CALORIAS MENSUALES</h1>
      <div
        className="caloriasMensuales"
        style={{ marginTop: "3%", backgroundColor: "#50595C" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          <div style={{ padding: "10px", border: "2px solid #fff" }}>
            MES ACTUAL
          </div>
          <div style={{ padding: "10px", border: "2px solid #fff" }}>
            CALORÍAS MENSUALES TOTALES
          </div>
          <div style={{ padding: "10px", border: "2px solid #fff" }}>
            ÍNDICE
          </div>
        </div>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            padding: "10px",
          }}
        >
          {meses.map((mes, index) => {
            const calorias = calcularCaloriasTotales(mes);
            const indice = calorias > 0 ? "negativo" : "positivo";
            return (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                }}
              >
                <div style={{ padding: "10px", border: "2px solid #fff" }}>
                  {mes.charAt(0).toUpperCase() + mes.slice(1)}
                </div>
                <div
                  style={{
                    padding: "10px",
                    border: "2px solid #fff",
                    color: calorias > 0 ? "red" : "#32CD32",
                    fontSize: "20px",
                  }}
                >
                  {calorias}
                </div>
                <div
                  style={{
                    padding: "10px",
                    border: "2px solid #fff",
                    color: calorias > 0 ? "red" : "#32CD32",
                    fontSize: "20px",
                  }}
                >
                  {indice}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}

export default KalCalculator;
