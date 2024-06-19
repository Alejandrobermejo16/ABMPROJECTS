import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function KalCalculator(props) {
  const { cal } = props;

  const loadComboFood = async () => {
    const foodToken = process.env.FOOD_APP_TOKEN;

    const url = 'https://foodapi.calorieking.com/v1/foods';

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${btoa(foodToken + ':')}` 
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener los alimentos');
      }

      const data = await response.json();
      console.log(data.foods); 
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      <h1>Actualmente has consumido {cal} calorías</h1>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">
            Alimento Ingerido
          </Form.Label>
          <Form.Select
            id="disabledTextInput"
            onClick={loadComboFood}
            aria-label="Selecciona un alimento de la lista"
          >
            <option value="">Selecciona un alimento de la lista</option>
          </Form.Select>
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
      </Form>
    </div>
  );
}

export default KalCalculator;
