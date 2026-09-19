import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";

function Explore() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <h1 className="text-4xl">
        Your journey begins...
      </h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/explore/:destination"
          element={<Explore />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;