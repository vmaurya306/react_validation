import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="App">
      <h1>Home</h1>
      <Link to="registration">Register</Link>
      <br></br>
      <Link to="login">Login</Link>
    </div>
  );
}

export default Home;
