import { Container, Row, Col, Button, Modal, InputGroup, Form, Spinner } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchColumnRandomStart } from '../store/actions/fetchColumnAleatorio';
import { getProjectsStart, addTaskStart, getListTaskStart } from '../store/actions/task';


class GridDashboard extends Component {

    constructor() {
        super();
        this.state = { openModal: false, openModal2: false, tareaYaEscrita: false, inputValue: '', disabledCheckbox: true };
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataRandom !== prevProps.dataRandom) {
            //console.log('Nuevo valor de dataRandom:', this.props.dataRandom);
        }
    }


    componentDidMount() {
        const { getListProjectsAction, getListTaskAction } = this.props;
        getListProjectsAction();
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
    openModalAddTask2 = (projectId) => {
        this.setState({ openModal: false });
        this.setState({ openModal2: true, selectedProjectId: projectId })

    }
    closedModalAddTask2 = () => {
        this.setState({ openModal2: false, tareaYaEscrita: false });

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

    //cambia el estado de visibilidad del checkbox cada vez que se le llama
    statusCheckbox = () => {
        const { disabledCheckbox } = this.state;
        alert('se ha cambiado el checkbox');
        this.setState({ disabledCheckbox: !disabledCheckbox })
    }

    render() {
        const { dataRandom, fetchColumnAleatorioAction, addTaskAction, listProjects, listTasks, loading } = this.props;
        const { openModal, openModal2, tareaYaEscrita, inputValue, disabledCheckbox } = this.state;
        //creo un array vacio donde guardaremos el nombre de los proyectos o tareas 
        //dentro a ese array le metemos una lista que tendra como key , las claves del objeto pero solo accederemos
        //a name
        const proyectos = [];
        const idProyecto = [];

        // Renderizar Spinner si loading es true
        if (loading) {
            return <Spinner animation="border" variant="primary" />;
        }


        for (let key in listProjects.listProjects) {
            proyectos.push(
                <Col key={key}>
                    {listProjects.listProjects[key].name}

                </Col>
            );
            idProyecto.push(listProjects.listProjects[key].id); //  En cada bucle , añadimos el id perteneciente a cada proyecto
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
                         {/* se obtiene el nombre del proyecto y se busca que la tarea coincida con cada proyecto para mostrarla dentro de cada proyecto */}
                        {listProjects.listProjects && listProjects.listProjects.map((project, index) => (
                            <div key={index}>
                                <h4>{project.name}</h4>
                                {listTasks.listTasks && listTasks.listTasks
                                    .filter(task => task.projectId === project.id)
                                    .map((task, taskIndex) => (
                                        <div key={taskIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                            {!this.state.disabledCheckbox && 
                                            <input 
                                             type="checkbox" 
                                             onChange={this.statusCheckbox}
                                             />}
                                            <p style={{ color: 'yellow', marginLeft: '5px' }} key={taskIndex}>{task.content}</p>
                                        </div>
                                    ))}
                            </div>
                        ))}



                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <Button size="sm" variant="primary" onClick={this.openModalAddTask}>Añadir Tarea</Button>
                            <Button size="sm" variant="primary" onClick={this.statusCheckbox}>Eliminar Tarea</Button>
                        </div>

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
                        {dataRandom && <h1 style={{ color: 'yellow' }}>{dataRandom.dataRandom}</h1>}
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
                        {proyectos.map((nombreProyecto, index) => (
                            <Button
                                key={index}
                                variant="dark"
                                disabled={!tareaYaEscrita}
                                onClick={() => {
                                    addTaskAction(idProyecto[index], inputValue);
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
    listProjects: state.taskReducer.listProjects,
    listTasks: state.taskReducer.listTasks,
    loading: state.taskReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchColumnAleatorioAction: () => dispatch(fetchColumnRandomStart()),
    getListProjectsAction: () => dispatch(getProjectsStart()),
    getListTaskAction: () => dispatch(getListTaskStart()),
    addTaskAction: (selectedProjectId, text) => dispatch(addTaskStart(selectedProjectId, text)),
    deleteTaskAction: (idTask) => dispatch()

});


export default connect(mapStateToProps, mapDispatchToProps)(GridDashboard);
