import React, { useState } from "react";
import Menu from "./Menu";
import Posts from "./Posts";
import { Routes, Route } from "react-router-dom";
import NewPost from "./NewPost";
import Profile from "./Profile";
import HighlightStories from "./stories";
import styled from "styled-components";

function Home() {
  const [posts, setPosts] = useState([
    {
      title: "Primeiro Post",
      user: "@julia",
      content: "Esse é um exemplo de postagem inicial.",
    },
  ]);

  const stories = [
    {
      title: "DIÁRIO",
      thumb: "src/imagens/ultrassom.jpg",
      stories: [
        { url: "src/imagens/ultrassom.jpg" },
        { url: "src/imagens/ultrassom2.jpg" },
      ],
    },
    {
      title: "FAMÍLIA",
      thumb: "src/imagens/familia.jpg",
      stories: [{ url: "src/imagens/familia.jpg" }],
    },
  ];

  // Função para adicionar novo post
  const addPost = (post) => {
    setPosts([post, ...posts]); // adiciona no início do array
  };

  return (
    <div>
      <Menu />
      <HighlightStories stories={stories} />

      <Routes>
        <Route path="/" element={<Posts posts={posts} />} />
        <Route path="/newpost" element={<NewPost addPost={addPost} />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default Home;
