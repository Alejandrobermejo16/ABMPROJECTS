import React from 'react';
import '../styles/ReservasHipica.css';
import GaleriaImagenes from '../helpers/GaleriaImagenes';
import Clock from '../helpers/Clock';
import { GALERIARESERVASHIPICA } from '../Constants';
import { CalendarDateFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';


class ReservasHipica extends React.Component {

openModalReserve = () => {
    this.setState({})
}

    render() {
        return (
            <div
                className='ReservasHipica'
                style={{
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <Clock formato="horayfecha" />
                <h1 style={{ paddingTop: '30px', paddingLeft:'600px'}}>HIPICA  DON FAUSTINO</h1>
                <GaleriaImagenes imagenes={GALERIARESERVASHIPICA} />
                <div  style={{ width: '1500px', height: '100px', paddingLeft: '200px', paddingTop: '20px', textAlign: "center", fontSize: '26px'}}>
                <p>¡Experimenta la emoción de montar a caballo en nuestra hípica! <br></br> Descubre la belleza de un paseo a caballo mientras exploras nuestros impresionantes senderos naturales. <br></br> Desde principiantes hasta jinetes experimentados, ¡todos son bienvenidos! Para reservar esta increíble experiencia ecuestre, simplemente pulsa en el siguiente botón</p>
                </div>
                <div style={{  paddingLeft: '700px', paddingTop: '100px' }}>
                    <Button variant="primary" >
                        <CalendarDateFill color="black" size={50} style={{ paddingRight: '10px' }} />
                        RESERVAR</Button>
                </div>

            </div>
        );
    }
}

export default ReservasHipica;

