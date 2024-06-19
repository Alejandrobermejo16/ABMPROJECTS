import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function KalCalculator(props) {
  const { cal } = props;

  const loadComboFood = () => {
    alert('Alimento Ingerido');
  };

  return (
    <div>
      <h1>Actualmente has consumido {cal} calorías</h1>

      <Form>
        <fieldset disabled>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">
              Alimento Ingerido
            </Form.Label>
            <Form.Control
              id="disabledTextInput"
              placeholder="Selecciona un alimento de la lista"
              onClick={loadComboFood}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">
              Hora en la que se ingiere
            </Form.Label>
            <Form.Select id="disabledSelect">
              <option>Disabled select</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">
              Actividad Realizada
            </Form.Label>
            <Form.Control
              id="disabledTextInput"
              placeholder="Selecciona un ejercicio realizado"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">
              Hora en la que se realiza
            </Form.Label>
            <Form.Select id="disabledSelect">
              <option>Disabled select</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit">Enviar</Button>
        </fieldset>
      </Form>
    </div>
  );
}

export default KalCalculator;
