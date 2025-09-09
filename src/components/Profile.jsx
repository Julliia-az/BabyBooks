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

import bbColo from "../imagens/bbColo.jpg";
const avatarUrl = bbColo; // Foto do perfil

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
  margin-bottom: 8px; /* reduzido para ficar mais próximo do topo */

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

const NewPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;

  textarea {
    width: 100%;
    min-height: 60px;
    padding: 8px;
    resize: none;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #dbdbdb;
  }

  button {
    align-self: flex-end;
    padding: 6px 16px;
    font-size: 14px;
    border-radius: 8px;
    border: none;
    background-color: #c97d68;
    color: white;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background-color: #c6cdbc;
    }
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MediaPost = styled.div`
  width: 100%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.body};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MediaWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 12px;
  background-color: #f0f0f0;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Caption = styled.p`
  padding: 4px 6px;
  font-size: 13px;
  text-align: center;
  background-color: ${({ theme }) => theme.body};
  font-family: monospace;
`;

const EmptyTab = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const TextPostGrid = styled.div`
  display: grid;
  gap: 8px;
  margin: 15px 0;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TextPost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  word-break: break-word;
  text-align: center;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  font-size: 14px;
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
  const [caption, setCaption] = useState("");
  const [textPosts, setTextPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [mediaPosts, setMediaPosts] = useState([]);
  const [newFile, setNewFile] = useState(null);

  const [stories, setStories] = useState([]);

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setTextPosts([newPost, ...textPosts]);
      setNewPost("");
    }
  };

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setNewFile(file);
  }

  function handleMediaSubmit() {
    if (!newFile) return;
    const url = URL.createObjectURL(newFile);
    setMediaPosts([{ file: newFile, url, caption }, ...mediaPosts]);
    setNewFile(null);
    setCaption("");
  }

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
          <TabButton
            onClick={() => setTab("textos")}
            active={tab === "textos"}
          >
            TEXTOS
          </TabButton>
        </Tabs>

        <main>
          {tab === "posts" && (
            <>
              <NewPost>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <motion.label
                  htmlFor="fileInput"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="action-btn"
                >
                  Fazer um post
                </motion.label>

                {newFile && (
                  <textarea
                    placeholder="Escreva uma legenda..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                )}

                {newFile && (
                  <motion.button
                    onClick={handleMediaSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Publicar
                  </motion.button>
                )}
              </NewPost>

              <PostGrid>
                {mediaPosts.map((post, i) => (
                  <MediaPost key={i}>
                    <MediaWrapper>
                      {post.file.type.startsWith("image") ? (
                        <img src={post.url} alt="post" />
                      ) : (
                        <video src={post.url} controls />
                      )}
                    </MediaWrapper>
                    {post.caption && <PostCaption text={post.caption} />}
                  </MediaPost>
                ))}
              </PostGrid>

              {mediaPosts.length === 0 && (
                <EmptyTab>
                  <h2>Nenhum post ainda</h2>
                  <p>Poste uma foto ou vídeo para aparecer nesta seção!</p>
                </EmptyTab>
              )}
            </>
          )}

          {tab === "textos" && (
            <>
              <NewPost>
                <textarea
                  placeholder="O que você gostaria de compartilhar?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />

                <motion.button
                  onClick={handlePostSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Publicar
                </motion.button>
              </NewPost>

              {textPosts.length > 0 ? (
                <TextPostGrid>
                  {textPosts.map((text, i) => (
                    <TextPost key={i}>
                      <ScrollPanel
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "2px solid #ccc",
                        }}
                      >
                        <div style={{ padding: "10px" }}>{text}</div>
                      </ScrollPanel>
                    </TextPost>
                  ))}
                </TextPostGrid>
              ) : (
                <EmptyTab>
                  <h2>Nada compartilhado ainda</h2>
                  <p>Escreva algo para aparecer nesta seção.</p>
                </EmptyTab>
              )}
            </>
          )}
        </main>
      </Container>
    </ProfilePage>
  );
}
