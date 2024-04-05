import React from 'react';
import '../styles/ReservasHipica.css';
import GaleriaImagenes from '../helpers/GaleriaImagenes';
import Clock from '../helpers/Clock';
import { GALERIARESERVASHIPICA } from '../Constants';
import { CalendarDateFill } from 'react-bootstrap-icons';
import { Button, Modal } from 'react-bootstrap';


class ReservasHipica extends React.Component {

    constructor() {
        super();
        this.state = { openModal: false };
    }

    openModalReserve = () => {
        this.setState({ openModal: true });
    }

    render() {
        const { openModal } = this.state;

        return (
            <div
                className='ReservasHipica'
                style={{
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <Clock formato="horayfecha" />
                <h1 style={{ paddingTop: '30px', paddingLeft: '600px' }}>HIPICA  DON FAUSTINO</h1>
                <GaleriaImagenes imagenes={GALERIARESERVASHIPICA} />
                <div style={{ width: '1500px', height: '100px', paddingLeft: '200px', paddingTop: '20px', textAlign: "center", fontSize: '26px' }}>
                    <p>¡Experimenta la emoción de montar a caballo en nuestra hípica! <br></br> Descubre la belleza de un paseo a caballo mientras exploras nuestros impresionantes senderos naturales. <br></br> Desde principiantes hasta jinetes experimentados, ¡todos son bienvenidos! Para reservar esta increíble experiencia ecuestre, simplemente pulsa en el siguiente botón</p>
                </div>
                <div style={{ paddingLeft: '700px', paddingTop: '100px' }}>
                    <Button variant="primary" >
                        <CalendarDateFill color="black" size={50} style={{ paddingRight: '10px' }} onClick={() => this.openModalReserve()} />
                        RESERVAR</Button>
                </div>


                <Modal show={openModal} fullscreen centered>
                    <Modal.Body >
                        <div className="flex items-center md:items-start gap-2">
                            <h3 className="text-body-4 md:text-body-2 font-semibold text-metal-900">
                                Introduce la fecha de la reserva
                            </h3>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>



                        <Button variant="dark" onClick={() => this.setState({ openModal: false })}>Cerrar</Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ReservasHipica;

