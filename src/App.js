import "./App.css";
import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Repositories from "./components/pages/Repositories/Repositories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="repositories/:name/:owner" element={<Repositories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
