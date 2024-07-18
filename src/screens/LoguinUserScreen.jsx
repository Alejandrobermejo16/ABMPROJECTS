import React, { useState } from "react";
import { connect } from 'react-redux'; // Importar connect
import { loginUser } from '../store/actions/common'; // Importar la acción loginUser
import AddUserForm from "../components/AddUserForm";
import "../styles/abmLoggingScreen.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Fit from "../screens/Fit";

const LoginUserScreen = ({ dispatch, user }) => { // Recibir user del estado global

  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const sendDataUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl =
        process.env.REACT_APP_API_URL || "https://backendabmprojects.vercel.app";

      const createUserResponse = await axios.post(
        `${apiUrl}/api/users/loggin`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (createUserResponse.status === 200) {
        const userData = createUserResponse.data.userData;
        setMessage("Accediendo a los datos del usuario...");
        dispatch(loginUser(userData)); // Dispatch de la acción loginUser
        setLoadUser(true); // Actualizar estado local
      } else {
        setMessage(
          "El usuario o contraseña no existen en la base de datos. Cierra la pestaña y crea un usuario."
        );
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      console.error("Respuesta del servidor:", error.response);
      setMessage("Error al enviar el formulario");
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizado condicional basado en loadUser y user del estado global
  if (loadUser || user) {
    return <Fit />;
  } else {
    return (
      <div className="abmLoggingScreen">
        <div className="abmLoggingScreen-content">
          <h1>¡Bienvenido a ABM FIT!</h1>
          <p>¿Ya tienes cuenta con nosotros? Inicia sesión con tus datos.</p>
          <button onClick={handleLoginClick}>Iniciar Sesión</button>
          <p>¿No tienes cuenta? Regístrate aquí.</p>
          <AddUserForm />
        </div>

        <Modal show={openModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar Sesión</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>{message}</p> {/* Mostrar mensaje al usuario */}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            {isLoading ? (
              <Button variant="primary" disabled>
                Cargando...
              </Button>
            ) : (
              <Button variant="primary" onClick={sendDataUser}>
                Iniciar Sesión
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

// Mapear parte del estado global a las props del componente
const mapStateToProps = (state) => ({
  user: state.user.user // Acceder al estado del usuario
});

// Conectar el componente con Redux
export default connect(mapStateToProps)(LoginUserScreen);
