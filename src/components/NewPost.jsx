import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrollPanel } from "primereact/scrollpanel";
import "primeicons/primeicons.css";
import HighlightStories from "./stories";
import Menu from "./Menu";
import styled from "styled-components";
import TextPosts from "./Posts/TextPost.jsx";
import MediaPosts from "./Posts/MediaPost.jsx";

// 🔹 Styled Components
const ProfilePage = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

const Container = styled.div`
  max-width: 935px;
  margin: 0 auto;
  padding: 16px;

  @media (min-width: 768px) {
    padding: 30px 20px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 0px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 50px;
  }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;

  @media (min-width: 768px) {
    align-items: flex-start;
    gap: 20px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #dbdbdb;
  margin-top: 15px;
`;

const TabButton = styled.button.attrs((props) => ({
  "data-active": props.active ? "true" : "false",
}))`
  flex: 1;
  max-width: 250px;
  padding: 12px;
  font-size: 13px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: ${({ active, theme }) => (active ? theme.text : "#8e8e8e")};
  letter-spacing: 1px;
  border-top: ${({ active }) => (active ? "1px solid #262626" : "none")};
`;

const CaptionContainer = styled.div`
  padding: 4px 6px;
  font-size: 13px;
  text-align: center;
  background-color: ${({ theme }) => theme.body};
  font-family: monospace;
  max-height: ${({ expanded }) => (expanded ? "none" : "40px")};
  overflow: hidden;
  position: relative;
`;

const ReadMoreButton = styled.span`
  display: block;
  margin-top: 4px;
  color: #c97d68;
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
`;

function PostCaption({ text }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 80;

  if (text.length <= maxLength) {
    return <CaptionContainer expanded>{text}</CaptionContainer>;
  }

  return (
    <CaptionContainer expanded={expanded}>
      {expanded ? text : text.slice(0, maxLength) + "..."}
      <ReadMoreButton onClick={() => setExpanded(!expanded)}>
        {expanded ? "Ler menos" : "Ler mais"}
      </ReadMoreButton>
    </CaptionContainer>
  );
}

// 🔹 Página
export default function Profile() {
  const [tab, setTab] = useState("posts");
  const [textPosts, setTextPosts] = useState([]);
  const [mediaPosts, setMediaPosts] = useState([]);
  const [stories, setStories] = useState([]);

  return (
    <ProfilePage>
      <Menu />
      <Container style={{ paddingTop: "0" }}>
        <Header>
          <Info>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Aqui você pode adicionar nome, bio, etc */}
            </div>
          </Info>
        </Header>

        <Tabs>
          <TabButton onClick={() => setTab("posts")} active={tab === "posts"}>
            POSTS
          </TabButton>
          <TabButton onClick={() => setTab("textos")} active={tab === "textos"}>
            TEXTOS
          </TabButton>
        </Tabs>

        {tab === "posts" && (
          <MediaPosts mediaPosts={mediaPosts} setMediaPosts={setMediaPosts} />
        )}

        {tab === "textos" && (
          <TextPosts textPosts={textPosts} setTextPosts={setTextPosts} />
        )}
      </Container>
    </ProfilePage>
  );
}
