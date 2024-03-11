import { Container, Row, Col, Button, Modal, InputGroup, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchColumnRandomStart } from '../store/actions/fetchColumnAleatorio';
import { getListTask, addTaskStart } from '../store/actions/task';


class GridDashboard extends Component {

    constructor() {
        super();
        this.state = { openModal: false, openModal2: false, tareaYaEscrita: false, inputValue: '' };
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataRandom !== prevProps.dataRandom) {
            console.log('Nuevo valor de dataRandom:', this.props.dataRandom);
        }
    }


    componentDidMount() {
        const { getListTaskAction } = this.props;
        getListTaskAction();
    }

    //abre la primera modal
    openModalAddTask = () => {
        this.setState({ openModal: true });
    }
    closedModalAddTask = () => {
        this.setState({ openModal: false });
    }

    //abre la segunda modal cerrando la primera
    openModalAddTask2 = () => {
        this.setState({ openModal: false });
        this.setState({ openModal2: true })

    }
    closedModalAddTask2 = () => {
        this.setState({ openModal2: false })

    }

    textoRecibido = (event) => {

        const inputValue = event.target.value;

        if (inputValue !== '') {
            this.setState({ tareaYaEscrita: true });
            this.setState({ inputValue });
        } else {
            this.setState({ tareaYaEscrita: false });
            this.setState({ inputValue });
        }

    }

    render() {
        const { dataRandom, fetchColumnAleatorioAction, addTaskAction, deleteTask, listTask } = this.props;
        const { openModal, openModal2, tareaYaEscrita, inputValue } = this.state;
        //creo un array vacio donde guardaremos el nombre de los proyectos o tareas 
        //dentro a ese array le metemos una lista que tendra como key , las claves del objeto pero solo accederemos
        //a name
        const tareasRealizadas = [];
        const idProyecto = [];
        for (let key in listTask.listTask) {
            tareasRealizadas.push(
                <Col key={key}>
                    {listTask.listTask[key].name}
                </Col>
            );
            idProyecto.push(listTask.listTask[key].id); // Añadimos el ID de todos los proyectos a la lista

        }


        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Estudios</h3>
                        <p>Contenido de la columna 1</p>
                        <p>Contenido de la columna 1</p>
                        <p>Contenido de la columna 1</p>
                        <p>Contenido de la columna 1</p>
                    </Col>
                    <Col>
                        <h3>Tareas realizadas</h3>
                        <ul>
                            {tareasRealizadas}
                        </ul>
                        <Button variant="dark" onClick={this.openModalAddTask}>Añadir Tarea</Button>
                        <p>Contenido de la columna 2</p>
                        <p>Contenido de la columna 2</p>
                        <p>Contenido de la columna 2</p>
                    </Col>
                    <Col>
                        <h3>Experiencia</h3>
                        <p>Contenido de la columna 3</p>
                        <p>Contenido de la columna 3</p>
                        <p>Contenido de la columna 3</p>
                        <p>Contenido de la columna 3</p>

                    </Col>
                    <Col>
                        <h3>Cualidades</h3>
                        <p>Contenido de la columna 4</p>
                        <p>Contenido de la columna 4</p>
                        <p>Contenido de la columna 4</p>
                        <p>Contenido de la columna 4</p>

                    </Col>
                    <Col>
                        <h3>Palabra aleatoria</h3>
                        <Button variant="dark" onClick={fetchColumnAleatorioAction}>Aleatorio</Button>
                        {dataRandom && <h1>{dataRandom.dataRandom}</h1>}
                        <p>Contenido de la columna 5</p>
                        <p>Contenido de la columna 5</p>
                        <p>Contenido de la columna 5</p>

                    </Col>
                </Row>
                <Modal show={openModal} size="sm">
                    <Modal.Body>
                        <div className="flex items-center md:items-start gap-2">
                            <h3 className="text-body-4 md:text-body-2 font-semibold text-metal-900">
                                Escribe la tarea y selecciona el proyecto al que añadirla
                            </h3>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="dark" onClick={this.openModalAddTask2}>Siguiente</Button>

                        <Button variant="dark" onClick={this.closedModalAddTask}>Cerrar</Button>

                        {/* Aquí puedes agregar cualquier contenido adicional para el pie de página del modal */}
                    </Modal.Footer>
                </Modal>

                <Modal show={openModal2} size="sm">
                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Text>Tarea</InputGroup.Text>
                            <Form.Control
                                as="textarea" a
                                ria-label="With textarea"
                                onChange={this.textoRecibido}

                            />
                        </InputGroup>
                        {tareasRealizadas.map((nombreProyecto, index) => (
                            <Button
                                key={index}
                                variant="dark"
                                disabled={!tareaYaEscrita}
                                onClick={() => {
                                    addTaskAction(idProyecto, inputValue);
                                    this.closedModalAddTask2();
                                }}>
                                {nombreProyecto}

                            </Button>
                        ))}

                    </Modal.Body>
                    <Modal.Footer>

                        {/*el boton de añadir debe de ser pulsado cuando seleecionemos un proyecto y escribamos algo  */}

                        <Button variant="dark" onClick={this.closedModalAddTask2}>Cerrar</Button>

                        {/* Aquí puedes agregar cualquier contenido adicional para el pie de página del modal */}
                    </Modal.Footer>
                </Modal>

            </Container >

        );
    }
}

const mapStateToProps = (state) => ({
    dataRandom: state.columnRandomReducer.dataRandom,
    listTask: state.taskReducer.listTask
});

const mapDispatchToProps = (dispatch) => ({
    fetchColumnAleatorioAction: () => dispatch(fetchColumnRandomStart()),
    getListTaskAction: () => dispatch(getListTask()),
    addTaskAction: (id, text) => dispatch(addTaskStart(id, text)),
    deleteTaskAction: (idTask) => dispatch()

});


export default connect(mapStateToProps, mapDispatchToProps)(GridDashboard);
