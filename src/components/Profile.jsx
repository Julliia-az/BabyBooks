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

import bbColo from "../imagens/bbColo.jpg";
const avatarUrl = bbColo;

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
  margin-bottom: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 50px;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;

  @media (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const AddStoryButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #c97d68;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid white;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #a65e4f;
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

const Username = styled.h1`
  font-size: 20px;
  font-weight: 300;
  color: ${({ theme }) => theme.text};

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const FollowButton = styled(motion.button)`
  padding: 6px 16px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #dbdbdb;
  cursor: pointer;
  background: #c97d68;
  color: white;
  font-weight: 600;
  transition: 0.3s;

  &.following {
    background: #c97d68;
    color: white;
    border-color: #c97d68;
  }

  &:hover {
    background: #c6cdbc;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 14px;
  width: 100%;
  padding: 12px 0;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;

  @media (min-width: 768px) {
    justify-content: flex-start;
    border: none;
    padding: 0;
    gap: 40px;
    font-size: 16px;
  }
`;

const Bio = styled.div`
  font-size: 14px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    font-size: 16px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #dbdbdb;
  margin-top: 15px;
`;

const TabButton = styled.button`
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
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState("posts");
  const [textPosts, setTextPosts] = useState([]);
  const [mediaPosts, setMediaPosts] = useState([]);
  const [stories, setStories] = useState([]);

  function handleStoryChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setStories([{ file, url }, ...stories]);
  }

  return (
    <ProfilePage>
      <Menu />
      <Container style={{ paddingTop: "0" }}>
        <Header>
          <AvatarWrapper>
            <Avatar src={avatarUrl} alt="avatar" />
            <input
              type="file"
              id="storyInput"
              accept="image/*,video/*"
              onChange={handleStoryChange}
              style={{ display: "none" }}
            />
            <AddStoryButton htmlFor="storyInput">+</AddStoryButton>
          </AvatarWrapper>

          <Info>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Username>@mamãe.da.ana</Username>
              <FollowButton
                onClick={() => setFollowing(!following)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={following ? "following" : ""}
              >
                {following ? "Seguindo" : "Seguir"}
              </FollowButton>
            </div>

            <Stats>
              <span>
                <b>{mediaPosts.length + textPosts.length}</b> posts
              </span>
              <span>
                <b>1.076mil</b> seguidores
              </span>
              <span>
                <b>231</b> seguindo
              </span>
            </Stats>

            <Bio>
              <h2>Mamãe da Ana</h2>
              <p>Diário de aventuras e descobertas da minha pequena Ana! 💖</p>
            </Bio>
          </Info>
        </Header>

        <HighlightStories stories={stories} />

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
