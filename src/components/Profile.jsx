import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
// import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrollPanel } from "primereact/scrollpanel";
import "primeicons/primeicons.css";
import HighlightStories from "./stories";
import "./stories.css"; // CSS do stories/destaques
import "./ProfilePage.css";
import Menu from "./Menu";

import bbColo from "../imagens/bbColo.jpg";
const avatarUrl = bbColo; // Foto do perfil

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

// Página
export default function Profile() {
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState("posts");
  const [caption, setCaption] = useState("");

  const [textPosts, setTextPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setTextPosts([newPost, ...textPosts]);
      setNewPost("");
    }
  };

  const [mediaPosts, setMediaPosts] = useState([]);
  const [newFile, setNewFile] = useState(null);

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

  return (
    <div className="profile-page">
      <Menu />
      <div className="profile-container" style={{ paddingTop: "5rem" }}>
        <header className="profile-header">
          <div className="avatar-wrapper">
            <img src={avatarUrl} alt="avatar" className="avatar" />
          </div>

          <div className="profile-info">
            <div className="profile-top">
              <h1 className="username">@mamãe.da.ana</h1>
              <motion.button
                onClick={() => setFollowing(!following)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`follow-btn ${following ? "following" : ""}`}
              >
                {following ? "Seguindo" : "Seguir"}
              </motion.button>
            </div>

            <div className="stats">
              <span>
                <b>{mediaPosts.length + textPosts.length}</b> posts
              </span>
              <span>
                <b>1.076mil</b> seguidores
              </span>
              <span>
                <b>231</b> seguindo
              </span>
            </div>

            <div className="bio">
              <h2 className="name">Mamãe da Ana</h2>
              <p>Diário de aventuras e descobertas da minha pequena Ana! 💖</p>
            </div>
          </div>
        </header>

        <HighlightStories />
        <div className="tabs">
          <button
            onClick={() => setTab("posts")}
            className={`tab-btn ${tab === "posts" ? "active" : ""}`}
          >
            <span>POSTS</span>
          </button>
          <button
            onClick={() => setTab("textos")}
            className={`tab-btn ${tab === "textos" ? "active" : ""}`}
          >
            TEXTOS
          </button>
        </div>

        <main>
          {/* Aba POSTS */}
          {tab === "posts" && (
            <>
              <div className="new-post">
                {/* Esconde o input */}
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

                {/* campo de legenda (só aparece se tiver arquivo) */}
                {newFile && (
                  <textarea
                    placeholder="Escreva uma legenda..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="caption-input"
                  />
                )}

                {newFile && (
                  <motion.button
                    onClick={handleMediaSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="action-btn"
                  >
                    Publicar
                  </motion.button>
                )}
              </div>
              <div className="post-grid">
                {mediaPosts.map((post, i) => (
                  <div key={i} className="media-post">
                    <div className="media-wrapper">
                      {post.file.type.startsWith("image") ? (
                        <img src={post.url} alt="post" className="post-img" />
                      ) : (
                        <video src={post.url} controls className="post-img" />
                      )}
                    </div>
                    {post.caption && <p className="caption">{post.caption}</p>}
                  </div>
                ))}
              </div>{" "}
              {mediaPosts.length === 0 && (
                <div className="empty-tab">
                  <h2>Nenhum post ainda</h2>
                  <p>Poste uma foto ou vídeo para aparecer nesta seção.</p>
                </div>
              )}
            </>
          )}

          {/* Aba TEXTOS */}
          {tab === "textos" && (
            <>
              <div className="new-post">
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
              </div>

              {/* ScrollPanel */}
              {textPosts.length > 0 ? (
                <div className="text-post-grid">
                  {textPosts.map((text, i) => (
                    <div key={i} className="text-post">
                      <ScrollPanel
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "2px solid #ccc",
                        }}
                      >
                        <div style={{ padding: "10px" }}>{text}</div>
                      </ScrollPanel>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-tab">
                  <h2>Nenhum post de texto ainda</h2>
                  <p>Escreva algo para aparecer nesta seção.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
