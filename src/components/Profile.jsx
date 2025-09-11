import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrollPanel } from "primereact/scrollpanel";
import "primeicons/primeicons.css";
import HighlightDestaques from "./destaques"; // import do componente de stories
import Menu from "./Menu";
import styled from "styled-components";
import TextPosts from "./Posts/TextPost.jsx";
import MediaPosts from "./Posts/MediaPost.jsx";

import bbColo from "../imagens/bbColo.jpg";
const avatarUrl = bbColo;

// 🔹 Styled Components
const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 12px 0;
  flex-wrap: wrap;
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
  border: 3px solid rgba(0,0,0,0.06);
`;

/* botão que abre o input file */
const AddStoryButton = styled.label`
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #cb9383;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  font-weight: 600;
  background: ${({ className }) =>
    className && className.includes("following") ? "transparent" : "#c97d68"};
  color: ${({ className }) =>
    className && className.includes("following") ? "#000" : "#fff"};
`;

/* stats e bio */
const Stats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  align-items: center;
`;

const Bio = styled.div`
  margin-top: 6px;
  font-size: 14px;
`;

/* tabs */
const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 18px;
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
  &:hover { text-decoration: underline; }
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
  const [stories, setStories] = useState([
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
  ]);

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
        <HighlightDestaques stories={destaques} style={{ width: '100%' }} />

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
