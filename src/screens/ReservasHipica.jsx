import React from 'react';
import '../styles/ReservasHipica.css';
import GaleriaImagenes from '../helpers/GaleriaImagenes';
import Clock from '../helpers/Clock';
import { GALERIARESERVASHIPICA } from '../Constants';
import { CalendarDateFill } from 'react-bootstrap-icons';
import { Button, Modal, InputGroup, Form } from 'react-bootstrap';
import Datetime from 'react-datetime'; // Importa Datetime
import 'react-datetime/css/react-datetime.css'; // Importa los estilos

class ReservasHipica extends React.Component {
    constructor() {
        super();
        this.state = {
            openModal: false,
            selectedDate: new Date() // Inicializa la fecha seleccionada
        };
    }

    openModalReserve = () => {
        this.setState({ openModal: true });
    }

    closeModal = () => {
        this.setState({ openModal: false });
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    render() {
        const { openModal, selectedDate } = this.state;

        return (
            <div className='ReservasHipica' style={{ height: '100vh', width: '100vw' }}>
                <Clock formato="horayfecha" />
                <h1 style={{ paddingTop: '30px', paddingLeft: '600px' }}>HIPICA  DON FAUSTINO</h1>
                <GaleriaImagenes imagenes={GALERIARESERVASHIPICA} />
                <div style={{ width: '1500px', height: '100px', paddingLeft: '200px', paddingTop: '20px', textAlign: "center", fontSize: '26px' }}>
                    <p>¡Experimenta la emoción de montar a caballo en nuestra hípica! <br></br> Descubre la belleza de un paseo a caballo mientras exploras nuestros impresionantes senderos naturales. <br></br> Desde principiantes hasta jinetes experimentados, ¡todos son bienvenidos! Para reservar esta increíble experiencia ecuestre, simplemente pulsa en el siguiente botón</p>
                </div>
                <div style={{ paddingLeft: '700px', paddingTop: '100px' }}>
                    <Button variant="primary" onClick={this.openModalReserve}>
                        <CalendarDateFill color="black" size={50} style={{ paddingRight: '10px' }} />
                        RESERVAR
                    </Button>
                </div>

                <Modal show={openModal} size="xl" centered onHide={this.closeModal}>
                    <Modal.Body>
                        <div className="flex items-center md:items-start gap-2">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Nombre"
                                    aria-label="Nombre"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Apellidos"
                                    aria-label="Apellidos"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <h3 className="text-body-4 md:text-body-2 font-semibold text-metal-900">
                                Introduce la fecha de la reserva
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarDateFill color="black" size={40} style={{ paddingRight: '10px' }} />
                                <Datetime
                                    value={selectedDate}
                                    onChange={this.handleDateChange}
                                />
                            </div>
                            <InputGroup className="mb-3" style={{ paddingTop: '10px' }}>
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="direccion de correo"
                                    aria-label="direccion de correo"
                                    aria-describedby="direccion de correo"
                                />
                                <InputGroup.Text id="direccion de correo">@example.com</InputGroup.Text>
                            </InputGroup>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.closeModal}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ReservasHipica;
