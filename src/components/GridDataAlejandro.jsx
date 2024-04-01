import Container from 'react-bootstrap/Container';
import React from 'react';
import {Row, Col,Button} from 'react-bootstrap/';
import { Component } from 'react';
import { fetchColumnRandomStart, fetchTraduccionStart } from '../store/actions/fetchColumnAleatorio';
import { connect } from 'react-redux';


class GridDataAlejandro extends Component {
    
    render() {
        const {fetchColumnAleatorioAction, dataRandom, fetchTraduccionAction, palabraEspañol} = this.props;
        
        
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Pincha en el boton para ver la palabra Aleatoria</h3>
                        <Button variant="dark" onClick={fetchColumnAleatorioAction}>Aleatorio</Button>
                        {dataRandom && <h1 style={{ color: 'yellow' }}>{dataRandom.dataRandom}</h1>}
                        <Button variant="dark" onClick={() => fetchTraduccionAction(dataRandom.dataRandom)}>Usar Traductor de Google</Button>
                         {palabraEspañol && <h1 style={{ color: 'yellow' }}>{palabraEspañol.palabraEspañol}</h1>}

                    </Col>
                </Row>
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
    fetchTraduccionAction: (palabraIngles) => dispatch(fetchTraduccionStart(palabraIngles)),

});

export default connect(mapStateToProps, mapDispatchToProps)(GridDataAlejandro);

