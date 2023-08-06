import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import UserPage from "./pages/user/user";
import Login from "./pages/login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="registration" element={<UserPage />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
