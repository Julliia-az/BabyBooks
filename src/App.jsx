import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import Profile from "./components/Profile.jsx";
import NewPost from "./components/NewPost.jsx";
import Menu from "./components/Menu.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/newPost" element={<NewPost />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
}

export default App;
