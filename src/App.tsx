import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { EcommerceApp } from "./components/EcommerceApp";

function App() {
  return (
    <Router>
      <div className="App">
        <EcommerceApp />
      </div>
    </Router>
  );
}

export default App;
