import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="loading" element={<Loading />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;