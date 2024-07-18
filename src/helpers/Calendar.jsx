// CalendarioPrincipal.jsx
import React, { Component } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import "dayjs/locale/es";
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

  //funcion para incluir las comidas, ejercicios y horas de cada uno.
  handleDataSubmit = (data) => {

    const { 
      foodCalories,
      exerciseCalories,
     } = data;


    console.log('Datos recibidos del hijo:', data);
    const today = dayjs().startOf('day');

    // Procesar los datos para crear eventos
    const newEvents = [];

    if (data.foodValue && data.hourFood) {
      newEvents.push({
        start: dayjs(today).hour(parseInt(data.hourFood.split(':')[0])).minute(parseInt(data.hourFood.split(':')[1])).toDate(),
        end: dayjs(today).hour(parseInt(data.hourFood.split(':')[0])).minute(parseInt(data.hourFood.split(':')[1])).add(30, 'minute').toDate(),
        title: `Comida: ${data.foodValue}`
      });
    }

    if (data.exerciseQuery && data.hourExercise) {
      newEvents.push({
        start: dayjs(today).hour(parseInt(data.hourExercise.split(':')[0])).minute(parseInt(data.hourExercise.split(':')[1])).toDate(),
        end: dayjs(today).hour(parseInt(data.hourExercise.split(':')[0])).minute(parseInt(data.hourExercise.split(':')[1])).add(parseInt(data.exerciseDuration), 'minute').toDate(),
        title: `Ejercicio: ${data.exerciseQuery}`
      });
    }

    this.setState(prevState => ({
      events: [...prevState.events, ...newEvents]
    }));


    //en esa misma funcion puedo coger y meterle un post para que envie esos datos a mi bd y asi los tenga guardados en cada usuario,
    // y cuando se loguee el usuario que recupere lo que ya tiene haciendo un get a los datos y poniendoselo al estado del calendario 

    


    //Actualizacion de las calorias que se muestran en Las calorias actualmente consumidas y se pasan a Kalculator
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
