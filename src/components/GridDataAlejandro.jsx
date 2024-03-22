import Container from 'react-bootstrap/Container';
import React from 'react';
import {Row, Col,Button} from 'react-bootstrap/';
import { Component } from 'react';
import { fetchColumnRandomStart } from '../store/actions/fetchColumnAleatorio';
import { connect } from 'react-redux';


class GridDataAlejandro extends Component {
    render() {
        const {fetchColumnAleatorioAction, dataRandom} = this.props;
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Pincha en el boton para ver la palabra Aleatoria</h3>
                        <Button variant="dark" onClick={fetchColumnAleatorioAction}>Aleatorio</Button>
                        {dataRandom && <h1 style={{ color: 'yellow' }}>{dataRandom.dataRandom}</h1>}
                        
                    </Col>
                </Row>
            </Container>


        )
    }
}

const mapStateToProps = (state) => ({
    dataRandom: state.columnRandomReducer.dataRandom,
});

const mapDispatchToProps = (dispatch) => ({
    fetchColumnAleatorioAction: () => dispatch(fetchColumnRandomStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridDataAlejandro);

