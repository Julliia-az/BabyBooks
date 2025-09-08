import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import Profile from "./components/Profile.jsx";
import NewPost from "./components/NewPost.jsx";
import Menu from "./components/Menu.jsx";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./components/Theme";
import GlobalStyles from "./components/dark"; 

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <GlobalStyles />
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
