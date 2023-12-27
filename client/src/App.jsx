import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Header } from "./components";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search/Search";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search/>} />
      </Routes>
    </div>
  );
}

export default App;
