import React, { Component } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import "dayjs/locale/es";

dayjs.locale("es");

class CalendarioPrincipal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
  // views={["month","day"]}  esta prop es para controlar las vistas que se quieren ver de las tareas en el calendario
                // view='month' sirve como value, por ejemplo por si queremos cambiar a ver el dia cuando se pincha en algun lugar
                // date = {dayjs('2024-05-23T13:00:00').toDate(),} si queremos que empiece el calendario en un dia concreto
                //toolbar, si lo pongo en false no se muestra lo de arriba, por ejemplo si lo pongo en false y pongo  defaultView='month' el usuario solo puede ver el mes 
                // min dayjs('2024-05-23T12:00:00').toDate(), si quiero poner en el dia del calendario un horario comercial por ejemplo y no todas las horas
                // max dayjs('2024-05-23T12:00:00').toDate(), si quiero poner en el dia del calendario un horario comercial por ejemplo y no todas las horas
                //poner el formato de fecha que nosotros queramos
                /*formats = {{
              dayHeaderFromat: date => {
                  console.log(date)
                  returns dayjs(date).format("DD//MM/YYYY")
              }
              }}
              */                
              />
            </div>
        );
    }
}
CalendarioPrincipal.defaultProps = {
    width: "90vw", // Valor por defecto para el ancho del calendario
    height: "40vh" // Valor por defecto para el alto del calendario
};

export default CalendarioPrincipal;
