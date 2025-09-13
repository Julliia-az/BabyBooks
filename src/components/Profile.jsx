import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { motion } from "framer-motion";
import { ScrollPanel } from "primereact/scrollpanel";
import "primeicons/primeicons.css";
import Destaques from "./destaques";
import Menu from "./Menu";
import styled from "styled-components";
import TextPosts from "./Posts/TextPost.jsx";
import MediaPosts from "./Posts/MediaPost.jsx";

import bbColo from "/imagens/bbColo.jpg";
const avatarUrl = bbColo;

// 🔹 Styled Components
const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 60px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.06);
`;

const AddStoryButton = styled.label`
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #cb9383;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    align-items: center;
    gap: 10px;
  }
`;

const Username = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const FollowButton = styled(motion.button)`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 60;
  height: 32px;
  background: ${({ className }) =>
    className && className.includes("following") ? "transparent" : "#c97d68"};
  color: ${({ className }) =>
    className && className.includes("following") ? "#transparent" : "#fff"};
  &:hover {
    background: #c6cdbc;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Bio = styled.div`
  margin-top: 4px;
  font-size: 14px;
  width: 100%;
`;

const Tabs = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 15px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 700 : 500)};
  border-bottom: ${({ active }) => (active ? "2px solid #000" : "none")};
`;

const CaptionContainer = styled.div`
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.4;
`;

const ReadMoreButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  color: #c97d68;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const ProfilePage = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
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

  const destaques = stories;

  function handleStoryChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setStories([{ file, url }, ...stories]);
  }

  return (
    <ProfilePage>
      <Menu />

      <Container style={{ paddingTop: "6rem" }}>
        {/* Seção do Perfil */}
        <ProfileInfoWrapper>
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

          <UserInfo>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
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
          </UserInfo>
        </ProfileInfoWrapper>

        <Bio>
          <h2>Mamãe da Ana</h2>
          <p>Diário de aventuras e descobertas da minha pequena Ana! 💖</p>
        </Bio>

        {/* Destaques */}
        <Destaques stories={destaques} />

        {/* Tabs e Posts */}
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
