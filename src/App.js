import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Eliminamos Router de aquí
import GridDashboard from './components/GridDashboard'; 
import TranslateComponent from './components/translateComponent';
import ReservasHipica from './screens/ReservasHipica';
import LoginUserScreen from './screens/LoguinUserScreen';
import Bank from './screens/Bank';

import { Provider } from 'react-redux';
import store from './store/index';
import InitialDashboard from './screens/InitialDashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InitialDashboard />} />
            <Route path="/task" element={<GridDashboard />} />
            <Route path="/translate" element={<TranslateComponent />} />
            <Route path="/reservas" element={<ReservasHipica />} />
            <Route path="/fit" element={<LoginUserScreen />} />
            <Route path="/bank" element={<Bank />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
