import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </>
  );
}

export default App;