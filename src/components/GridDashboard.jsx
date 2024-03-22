import HeaderDashboard from './HeaderDashboard';
import '../styles/GridDashboard.css';
import { Container, Row, Col, Button, Modal, InputGroup, Form, Spinner } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectsStart, addTaskStart, getListTaskStart, deleteTaskStart } from '../store/actions/task';

class GridDashboard extends Component {

    constructor() {
        super();
        this.state = { openModal: false, openModal2: false, tareaYaEscrita: false, inputValue: '', disabledCheckbox: true, openModalDelete: false, selectedTaskId: null };
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
    statusCheckbox = (idTarea) => {
        const { disabledCheckbox } = this.state;
        console.log("El id de la tarea seleccionada es ", idTarea);
        this.setState({ disabledCheckbox: !disabledCheckbox, selectedTaskId: idTarea });
    }

    render() {
        const {  addTaskAction, listProjects, listTasks, loading, deleteTaskAction } = this.props;
        const { openModal, openModal2, tareaYaEscrita, inputValue, openModalDelete, selectedTaskId } = this.state;
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
            <Container style={{ minWidth: '1350px' }}> {/*para que el contenido salga bien extendido al pulsar en el filtro principal*/}
                <HeaderDashboard />
                <Row style={{ marginLeft: '-20px', overflowX: 'auto' }}>
    <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '20px' }}>
        {listProjects.listProjects && listProjects.listProjects.map((project, index) => (
            <div key={index} style={{ marginRight: '10px', marginLeft: '10px' }}> {/* Añade margen izquierdo y derecho */}
                <h5 className='NombreProyectos'>{project.name}</h5>
                {/* Mapeo de las tareas correspondientes a este proyecto */}
                <div className={'DivTareas'} > {/* Establece la altura máxima y permite el desplazamiento vertical */}
                    {listTasks.listTasks && listTasks.listTasks
                        .filter(task => task.projectId === project.id)
                        .map((task, taskIndex) => (
                            <div key={taskIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                {!this.state.disabledCheckbox &&
                                    <input
                                        type="checkbox"
                                        onChange={() => {
                                            this.statusCheckbox(task.id);
                                            this.setState({ openModalDelete: true }); // Actualiza el estado con el ID de la tarea seleccionada
                                        }}
                                        //funcion anonima para que solo se pase el id de la tarea seleccionada
                                        style={{ marginTop: '-20px' }}
                                    />}
                                <p style={{ color: 'yellow', marginLeft: '5px', marginBottom: '0' }} key={taskIndex}>{task.content}</p>
                            </div>
                        ))}
                </div>
            </div>
        ))}
    </div>
</Row>


                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', paddingRight: '260px' }}>
                    <Button size="sm" variant="primary" style={{ marginRight: '5px' }} onClick={this.openModalAddTask}>Añadir Tarea</Button>
                    <Button size="sm" variant="primary" onClick={this.statusCheckbox}>Eliminar Tarea</Button>
                </div>

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

                <Modal show={openModalDelete} size="sm">
                    <Modal.Body>
                        <div className="flex items-center md:items-start gap-2">
                            <h3 className="text-body-4 md:text-body-2 font-semibold text-metal-900">
                                ¿Estas seguro de eliminar esta tarea?
                            </h3>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="dark" onClick={() => {
                            deleteTaskAction(selectedTaskId)
                            this.setState({ openModalDelete: false })
                        }
                        }>Eliminar</Button>

                        <Button variant="dark" onClick={() => this.setState({ openModalDelete: false })}>Cerrar</Button>

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
    getListProjectsAction: () => dispatch(getProjectsStart()),
    getListTaskAction: () => dispatch(getListTaskStart()),
    addTaskAction: (selectedProjectId, text) => dispatch(addTaskStart(selectedProjectId, text)),
    deleteTaskAction: (idTask) => dispatch(deleteTaskStart(idTask)),

});


export default connect(mapStateToProps, mapDispatchToProps)(GridDashboard);
