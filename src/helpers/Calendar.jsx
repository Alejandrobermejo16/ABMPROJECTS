// CalendarioPrincipal.jsx
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

  cambioEstiloDiaActual = (date) => {
    const today = dayjs().startOf('day');
    const isToday = dayjs(date).startOf('day').isSame(today);
    return isToday ? { style: { backgroundColor: 'lightblue' } } : {};
  }

  handleDataSubmit = async (data) => {
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
      if (exerciseCalories > 0 && foodCalories === 0) {
        newCal -= exerciseCalories;
      } else if (foodCalories > 0 && exerciseCalories === 0) {
        newCal += foodCalories;
      } else if (exerciseCalories > 0 && foodCalories > 0) {
        const netCalories = foodCalories - exerciseCalories; 
        newCal += netCalories;
      }
      return { cal: newCal };
    });

    try {

      console.log("prueba de resultado de calorias",cal, this.cal,newCal, this.state.cal);

      const apiUrl = process.env.REACT_APP_API_URL || "https://backendabmprojects.vercel.app";
      const userEmail = sessionStorage.getItem('userEmail'); // Obtener el correo electrónico del usuario desde sessionStorage

      console.log("API URL:", `${apiUrl}/api/users/cal`);
      console.log("Payload:", {
        userEmail: userEmail,
        calories: this.state.cal
      });

      const response = await axios.post(
        `${apiUrl}/api/users/cal`,
        {
          userEmail: userEmail, 
          calories: this.state.cal
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
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
        <KalCalculator onSubmit={this.handleDataSubmit} cal={this.state.cal} />
      </div>
    );
  }
}

CalendarioPrincipal.defaultProps = {
  width: "90vw",
  height: "40vh"
};

export default CalendarioPrincipal;
