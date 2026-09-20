import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import TripResult from "./pages/TripResult";
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

        <Route path="/home" element={<Home />} />

        <Route path="/plan-trip" element={<Planner />} />

        <Route path="/trip" element={<TripResult />} />

        <Route
          path="/explore/:destination"
          element={<Explore />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;