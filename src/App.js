import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GridDashboard from './components/GridDashboard'; 
import TranslateComponent from './components/translateComponent';
import ReservasHipica from './screens/ReservasHipica';
import LoginUserScreen from './screens/LoguinUserScreen';
import Bank from './screens/Bank';
import RegistryBank from './components/BankRegisrty';
import { Provider } from 'react-redux';
import store from './store/index';
import InitialDashboard from './screens/InitialDashboard';
import ListProductsBank from './components/ListProductsBank';
import AccountDetail from './components/AccountDetail';
import CardDetail from './components/CardDetail';
import School from './screens/School';
import NewInitialDashboard from './screens/NewInitialDashboard';

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
            <Route path="/newPanel" element={<NewInitialDashboard />} />
            <Route path="/fit" element={<LoginUserScreen />} />
            <Route path="/abmBank/login" element={<Bank />} />
            <Route path="/abmBank/register" element={<RegistryBank />} />
            <Route path="/abmBank/ListProducts" element={<ListProductsBank />} />
            <Route path="/abmBank/ListProducts/accounts/:id" element={<AccountDetail />} />
            <Route path="/abmBank/ListProducts/cards/:id" element={<CardDetail />} />
            <Route path="/abmBank/school" element={<School />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
