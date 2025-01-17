import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import IncrementPage from "./components/IncrementPage";
import RegistrationPage from "./components/RegistrationPage";
import "./styles/input.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/increment" element={<IncrementPage token={token} />} />
        <Route path="/register" element={<RegistrationPage />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
