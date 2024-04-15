import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Form } from 'react-bootstrap';
import { fetchColumnRandomStart, fetchTraduccionStart } from '../store/actions/fetchColumnAleatorio';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

class GridDataAlejandro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveText: '',
            hiddenBoton: 0,
        };
    }

    captureText = (event) => {
        const { value } = event.target;
        this.setState({ saveText: value });
    }

    render() {
        const { fetchColumnAleatorioAction, dataRandom, fetchTraduccionAction, palabraEspañol } = this.props;
        const { saveText, hiddenBoton } = this.state;

        return (
            <Container>
                <h3>Pincha en el botón para ver la palabra Aleatoria</h3>
                <Button variant="dark" onClick={fetchColumnAleatorioAction}>Aleatorio</Button>
                {dataRandom && <h1 style={{ color: 'yellow' }}>{dataRandom.dataRandom}</h1>}
                <div style={{ paddingBottom: '10px', paddingTop: '10px'}}>
                    <ExclamationTriangleFill /> El traductor aparecerá en un idioma aleatorio cada vez que sea pulsado
                </div> 
                <Button variant="primary" onClick={() => {
                     const idiomasDisponibles = ['es', 'it', 'pt', 'fr', 'de', 'ar'];
                     // Seleccionar un idioma aleatorio de la lista
                     const idiomaAleatorio = idiomasDisponibles[Math.floor(Math.random() * idiomasDisponibles.length)];                 
                    fetchTraduccionAction(dataRandom.dataRandom, idiomaAleatorio);
                    this.setState({ hiddenBoton: 1 });
                                   }}>Usar Traductor de Google </Button>
                {hiddenBoton === 1 && palabraEspañol && <h1 style={{ color: 'yellow' }}>{palabraEspañol.palabraEspañol}</h1>}
                <br></br>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Ingrese texto a Traducir:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese texto aquí"
                            style={{ height: '200px', textAlign: 'center', fontSize: '16px' }}
                            onChange={this.captureText}
                        />
                    </Form.Group>
                </Form>
                <Form>
                    {['radio'].map((type, index) => (
                        <div key={`inline-${type}-${index}`} className="mb-3">
                            <Form.Check
                                inline
                                label="Español 🇪🇸"
                                name="grupoIdiomas"
                                type={type}
                                id={`inline-${type}-1`}
                                onClick={() => {
                                    fetchTraduccionAction(saveText, 'es');
                                    this.setState({ hiddenBoton: 2 });
                                }}
                            />
                             <Form.Check
                                inline
                                label="Italiano 🇮🇹"
                                name="grupoIdiomas"
                                type={type}
                                id={`inline-${type}-5`}
                                onClick={() => {
                                    fetchTraduccionAction(saveText, 'it');
                                    this.setState({ hiddenBoton: 2 });
                                }}
                            />
                            <Form.Check
                                inline
                                label="Portugués 🇵🇹"
                                name="grupoIdiomas"
                                type={type}
                                id={`inline-${type}-6`}
                                onClick={() => {
                                    fetchTraduccionAction(saveText, 'pt');
                                    this.setState({ hiddenBoton: 2 });
                                }}
                            />
                            <Form.Check
                                inline
                                label="Frances 🇫🇷"
                                name="grupoIdiomas"
                                type={type}
                                id={`inline-${type}-3`}
                                onClick={() => {
                                    fetchTraduccionAction(saveText, 'fr');
                                    this.setState({ hiddenBoton: 2 });
                                }}
                            />
                            <Form.Check
                                inline
                                label="Alemán 🇩🇪"
                                name="grupoIdiomas"
                                type={type}
                                id={`inline-${type}-4`}
                                onClick={() => {
                                    fetchTraduccionAction(saveText, 'de');
                                    this.setState({ hiddenBoton: 2 });
                                }}
                            />
                            <Form.Check
                                inline
                                label="Arabe 🇸🇦"
                                name="grupoIdiomas"
                                type={type}
                                id={`inline-${type}-2`}
                                onClick={() => {
                                    fetchTraduccionAction(saveText, 'ar');
                                    this.setState({ hiddenBoton: 2 });
                                }}
                            />
                            
                        </div>
                    ))}
                </Form>
                {hiddenBoton === 2 && palabraEspañol && <h1 style={{ color: 'yellow' }}>{palabraEspañol.palabraEspañol}</h1>}
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    dataRandom: state.columnRandomReducer.dataRandom,
    palabraEspañol: state.columnRandomReducer.palabraEspañol
});

const mapDispatchToProps = (dispatch) => ({
    fetchColumnAleatorioAction: () => dispatch(fetchColumnRandomStart()),
    fetchTraduccionAction: (palabraIngles, pais = '') => dispatch(fetchTraduccionStart(palabraIngles, pais)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridDataAlejandro);
