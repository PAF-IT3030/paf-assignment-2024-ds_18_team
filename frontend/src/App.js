import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import Authentication from './Components/Authentication/Authentication';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={true ? <HomePage /> : <Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
