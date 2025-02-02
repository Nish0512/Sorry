import { Route, Routes, Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/second" element={<SecondPage />} />
      <Route path="/third" element={<ThirdPage />} />

    </Routes>
  );
}

export default App;
