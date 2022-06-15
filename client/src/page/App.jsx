import React from "react";
import { Routes, Route } from "react-router-dom";

// Import pages
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
