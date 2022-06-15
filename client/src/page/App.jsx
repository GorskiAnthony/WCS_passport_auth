import React from "react";
import { Routes, Route } from "react-router-dom";

// Import pages
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import NotFound from "./NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
