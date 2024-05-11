import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Authentication from "./Components/Authentication/Authentication";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="">
      <Routes>
        <Route
          path="/*"
          element={true ? <HomePage /> : <Authentication />}
        ></Route>
      </Routes>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default App;
