import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import api from "../services/api";

// Import pages
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import NotFound from "./NotFound";
import { UserContext } from "../context/UserContext";

const App = () => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    api
      .get("/auth/success", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        setUser(response.data.user["_json"]);
      })
      .catch((err) => console.error(err));
  }, []);
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
