import React from 'react';
import '../styles/ReservasHipica.css';
import GaleriaImagenes from '../helpers/GaleriaImagenes';
import Map from '../components/Map'
import Clock from '../helpers/Clock';
import { GALERIARESERVASHIPICA, GALERIARESERVASHIPICA2 } from '../Constants';
import { CalendarDateFill } from 'react-bootstrap-icons';
import { Button, Modal, InputGroup, Form } from 'react-bootstrap';
import Datetime from 'react-datetime'; // Importa Datetime
import 'react-datetime/css/react-datetime.css'; // Importa los estilos
import { sendHorseMailStart } from '../store/actions/sendMails';
import { connect } from 'react-redux';
import { Arrow90degLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";


class ReservasHipica extends React.Component {
    constructor() {
        super();
        this.state = {
            openModal: false,
            selectedDate: new Date(), // Inicializa la fecha seleccionada
            nombre: '',
            apellidos: '',
            correo: ''
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

    handleEnviarCorreo = () => {
        const { nombre, apellidos, correo, selectedDate } = this.state;
        const destinatario = `${correo}`;
        const nombreReserva = `${nombre} ${apellidos}`;
        const asunto = 'Reserva en Hípica Don Faustino';
        const mensaje = `Fecha de reserva: ${selectedDate}`;

        this.props.sendHorseMailAction(destinatario, asunto, mensaje, nombreReserva);
        this.closeModal();
    }

    render() {
        const { openModal, selectedDate, nombre, apellidos, correo } = this.state;

        return (
            <div className='ReservasHipica'>
                <Link to="/" className="Salir"> 
                    <Arrow90degLeft />
                </Link>
                <Clock formato="horayfecha" />
                <h1 >HIPICA  DON FAUSTINO</h1>
                <GaleriaImagenes className='Galeria' imagenes={GALERIARESERVASHIPICA} />
                <div>
                    <p>¡Experimenta la emoción de montar a caballo en nuestra hípica! <br></br> Descubre la belleza de un paseo a caballo mientras exploras nuestros impresionantes senderos naturales. <br></br> Desde principiantes hasta jinetes experimentados, ¡todos son bienvenidos! Para reservar esta increíble experiencia ecuestre, simplemente pulsa en el siguiente botón</p>
                </div>
                <div>
                    <Button variant="primary" onClick={this.openModalReserve}>
                        <CalendarDateFill color="black" size={50} />
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
                                    value={nombre}
                                    onChange={(e) => this.setState({ nombre: e.target.value })}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Apellidos"
                                    aria-label="Apellidos"
                                    aria-describedby="basic-addon1"
                                    value={apellidos}
                                    onChange={(e) => this.setState({ apellidos: e.target.value })}
                                />
                            </InputGroup>
                            <h3 className="text-body-4 md:text-body-2 font-semibold text-metal-900">
                                Introduce la fecha de la reserva
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <CalendarDateFill color="black" size={40} />
                                <Datetime
                                    value={selectedDate}
                                    onChange={this.handleDateChange}
                                />
                            </div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Direccion de correo"
                                    aria-label="Direccion de correo"
                                    aria-describedby="Direccion de correo"
                                    value={correo}
                                    onChange={(e) => this.setState({ correo: e.target.value })}
                                />
                                <InputGroup.Text id="Direccion de correo">@example.com</InputGroup.Text>
                            </InputGroup>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.closeModal}>Cerrar</Button>
                        <Button variant="primary" onClick={this.handleEnviarCorreo}>Enviar</Button>
                    </Modal.Footer>
                </Modal>



                <div className='galeria2'>
                    <GaleriaImagenes className='galeria3'
                        imagenes={GALERIARESERVASHIPICA2} />
                </div>



                <div className='MapContainer'>
                    <h1 style={{ marginBottom: '20px' }}>¿DÓNDE NOS ENCONTRAMOS?</h1>
                    <Map style={{ width: '100%' }} />
                    <p style={{ paddingTop: '10px', color: 'black' }}>
                        Madrid- San Sebastián de los Reyes  Camino Llano nº9, <span role="img" aria-label="Teléfono">☎️</span> tlf: 642034521 Alejandro
                    </p>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    sendHorseMailAction: (destinatario, asunto, mensaje, nombreReserva) => dispatch(sendHorseMailStart(destinatario, asunto, mensaje, nombreReserva)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservasHipica);
