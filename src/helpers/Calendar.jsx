import React, { Component } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import "dayjs/locale/es";
import axios from 'axios';
import KalCalculator from '../components/KalCalculator';

dayjs.locale("es");

class CalendarioPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cal: 0,
      events: [
        {
          start: dayjs('2024-05-23T12:00:00').toDate(),
          end: dayjs('2024-05-23T13:00:00').toDate(),
          title: "Ir al Gimnasio"
        }
      ]
    };
    this.localizer = dayjsLocalizer(dayjs);
  }

  async componentDidMount() 
  //se obtiene el ultimo registro de las calorias del usuario al iniciar el componente para mostrar las calorias actuales
  {
    const userEmail = sessionStorage.getItem('userEmail');
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "https://backendabmprojects.vercel.app";
      const response = await axios.get(`${apiUrl}/api/users/cal`, {
        params: { userEmail: userEmail }
      });
  
      if (response.status === 200 && response.data.calories.length > 0) {
        // Obtener solo el primer valor de calorías
        const firstCalorie = response.data.calories[0].value;
        this.setState({ cal: firstCalorie });
      }
    } catch (error) {
      console.error("Error al recuperar las calorías:", error);
    }
  }
  

  cambioEstiloDiaActual = (date) => {
    const today = dayjs().startOf('day');
    const isToday = dayjs(date).startOf('day').isSame(today);
    return isToday ? { style: { backgroundColor: 'lightblue' } } : {};
  }

  handleDataSubmit = (data) => {
    const { 
      foodCalories,
      exerciseCalories,
      foodValue,
      exerciseQuery,
      hourFood,
      hourExercise,
      exerciseDuration
    } = data;

    console.log('Datos recibidos del hijo:', data);
    const today = dayjs().startOf('day');

    const newEvents = [];

    if (foodValue && hourFood) {
      newEvents.push({
        start: dayjs(today).hour(parseInt(hourFood.split(':')[0])).minute(parseInt(hourFood.split(':')[1])).toDate(),
        end: dayjs(today).hour(parseInt(hourFood.split(':')[0])).minute(parseInt(hourFood.split(':')[1])).add(30, 'minute').toDate(),
        title: `Comida: ${foodValue}`
      });
    }

    if (exerciseQuery && hourExercise) {
      newEvents.push({
        start: dayjs(today).hour(parseInt(hourExercise.split(':')[0])).minute(parseInt(hourExercise.split(':')[1])).toDate(),
        end: dayjs(today).hour(parseInt(hourExercise.split(':')[0])).minute(parseInt(hourExercise.split(':')[1])).add(parseInt(exerciseDuration), 'minute').toDate(),
        title: `Ejercicio: ${exerciseQuery}`
      });
    }

    this.setState(prevState => ({
      events: [...prevState.events, ...newEvents]
    }));

    this.setState(prevState => {
      let newCal = prevState.cal;
      
      // Restar las calorías de ejercicio
      if (exerciseCalories > 0) {
        newCal -= exerciseCalories;
      }
      
      // Sumar las calorías de comida
      if (foodCalories > 0) {
        newCal += foodCalories;
      }
      
      return { cal: newCal };
    }, this.saveCalories);
  };

  checkCaloriesExists = async (userEmail) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "https://backendabmprojects.vercel.app";
      const response = await axios.get(`${apiUrl}/api/users/cal`, {
        params: { userEmail: userEmail }
      });

      return response.status === 200 && response.data.calories.length > 0;
    } catch (error) {
      console.error("Error al verificar la existencia de las calorías:", error);
      return false;
    }
  };

  saveCalories = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "https://backendabmprojects.vercel.app";
      const userEmail = sessionStorage.getItem('userEmail');
      const currentDate = dayjs();
      const currentMonth = currentDate.format('MMMM');  // Nombre del mes
      const currentDay = currentDate.date();  // Número del día
  
      // Redondear las calorías a enteros
      const roundedCalories = Math.round(this.state.cal);
  
      // Preparar el payload con las calorías redondeadas
      const payload = {
        userEmail: userEmail,
        calories: {
          value: roundedCalories,
          date: currentDate.toISOString()  // Fecha en formato ISO
        },
        CalMonth: {
          [currentMonth]: {
            days: {
              [currentDay]: {
                calories: roundedCalories
              }
            }
          }
        }
      };
  
      // Enviar la solicitud de actualización
      const response = await axios.put(`${apiUrl}/api/users/cal`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log("Datos de calorías guardados correctamente");
      } else {
        console.error("Error al guardar los datos de calorías");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
    }
  };
  

  render() {
    const { width, height } = this.props;
    return (
      <div className="calendario-container" style={{ width: width, height: height }}>
        <Calendar
          style={{ backgroundColor: 'white', color: 'black', width: '100%', height: '100%' }}
          localizer={this.localizer}
          events={this.state.events}
          defaultView='month'
          dayPropGetter={this.cambioEstiloDiaActual}
        />
        <KalCalculator onSubmit={this.handleDataSubmit} cal={Math.trunc(this.state.cal)} />
      </div>
    );
  }
}

CalendarioPrincipal.defaultProps = {
  width: "90vw",
  height: "40vh"
};

export default CalendarioPrincipal;
