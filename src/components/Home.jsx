import React, { useState } from "react";
import Menu from "./Menu";
import Posts from "./Posts";
import { Routes, Route } from "react-router-dom";
import NewPost from "./NewPost";
import Profile from "./Profile";
import HighlightStories from "./stories";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  margin-top: 80px; /* espaço para o Menu se for fixo */

  @media (min-width: 768px) {
    padding: 0 32px;
  }
`;

// Wrapper para posts e stories, max-width para telas grandes
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  gap: 24px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 32px;
  }
`;

function Home() {
  const [posts, setPosts] = useState([
    {
      title: "Mamãe da Ana",
      user: "data de postagem",
      content: "Exemplo de postagem inicial.",
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

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <PageContainer>
      <Menu /> {/* Caso o Menu seja fixo, use position: fixed no componente Menu */}
      <ContentContainer>
        <HighlightStories stories={stories} />
        <MainContent>
          <Routes>
            <Route path="/" element={<Posts posts={posts} />} />
            <Route path="/newpost" element={<NewPost addPost={addPost} />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </MainContent>
      </ContentContainer>
    </PageContainer>
  );
}

export default Home;
