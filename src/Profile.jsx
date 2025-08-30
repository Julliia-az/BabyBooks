import React, { useState } from "react";
import { motion } from "framer-motion";
// Importa imagens
import bbColo from "./imagens/bbColo.jpg";
import bbCozinhando from "./imagens/bbCozinhando.jpg";
import bbEstudio from "./imagens/bbEstudio.jpg";
import ultrassom from "./imagens/ultrassom.jpg";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import "./ProfilePage.css"; // Importa o CSS separado

// Imagens
const avatarUrl = bbColo;
const babyBookPhotos = [bbColo, bbCozinhando, bbEstudio, ultrassom];

// Ícones
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v-1H6.5a2.5 2.5 0 0 1 0-5H20V9H6.5a2.5 2.5 0 0 1 0-5H20V3H6.5A2.5 2.5 0 0 1 4 5.5v14z" />
  </svg>
);
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
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

//  Posts
function PostGrid({ photos }) {
  return (
    <div className="post-grid">
      {photos.map((src, i) => (
        <div key={i} className="post-item">
          <motion.img
            src={src}
            alt={`post-${i}`}
            className="post-img"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      ))}
    </div>
  );
}

// Destaques
function Highlight({ icon, title }) {
  return (
    <div className="highlight">
      <div className="highlight-icon">{icon}</div>
      <p className="highlight-title">{title}</p>
    </div>
  );
}

// Página
export default function Profile() {
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState("posts");
  const [textPosts, setTextPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setTextPosts([newPost, ...textPosts]);
      setNewPost("");
    }
  };

  const navigate = useNavigate();

  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items = [
    {
      //label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      //label: "User",
      icon: "pi pi-user",
      command: () => navigate("/perfil"),
    },
    {
      //label: "Contact",
      icon: "pi pi-bell",
      badge: 1,
      template: itemRenderer,
    },
  ];

  const start = (
    <img
      alt="logo"
      src="src/imagens/Logo.png"
      height="45"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
        style={{
          backgroundColor: "#cb9383",
          borderRadius: "30",
          height: "40px",
          width: "200px",
        }}
      />
      {/* <Avatar icon="pi pi-user" /> */}
    </div>
  );

  return (
    <div className="profile-page">
      <div className="card">
        <Menubar
          model={items}
          start={start}
          end={end}
          style={{ backgroundColor: "#c97d68" }}
        />
      </div>
      <div className="profile-container">
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
                <b>{babyBookPhotos.length + textPosts.length}</b> posts
              </span>
              <span>
                <b>2.4k</b> seguidores
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

        <section className="highlights">
          <Highlight icon={<BookIcon />} title="DIÁRIO" />
          <Highlight icon={<HeartIcon />} title="MESES" />
          <Highlight icon={<CameraIcon />} title="PASSEIOS" />
        </section>

        <div className="tabs">
          <button
            onClick={() => setTab("posts")}
            className={`tab-btn ${tab === "posts" ? "active" : ""}`}
          >
            POSTS
          </button>
          <button
            onClick={() => setTab("marcados")}
            className={`tab-btn ${tab === "marcados" ? "active" : ""}`}
          >
            MARCADOS
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
          {tab === "posts" && <PostGrid photos={babyBookPhotos} />}

          {/* Aba MARCADOS */}
          {tab === "marcados" && (
            <div className="empty-tab">
              <h2>Fotos com você</h2>
              <p>Quando marcarem você em uma foto, ela aparecerá aqui.</p>
            </div>
          )}

          {/* Aba TEXTOS */}
          {tab === "textos" && (
            <>
              {/* Novo post apenas na aba textos */}
              <div className="new-post">
                <textarea
                  placeholder="O que você quer compartilhar?"
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

              {/* Grid de posts de texto */}
              {textPosts.length > 0 ? (
                <div className="text-post-grid">
                  {textPosts.map((text, i) => (
                    <div key={`text-${i}`} className="text-post">
                      <p>{text}</p>
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
