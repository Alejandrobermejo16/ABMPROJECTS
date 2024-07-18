// userActions.js
export const loginUser = (userData) => {
    return (dispatch) => {
      dispatch({
        type: 'LOGIN_USER',
        payload: userData
      });
  
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
    };
  };
  