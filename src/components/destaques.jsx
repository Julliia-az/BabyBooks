import React, { useState } from "react";
import Stories from "react-insta-stories";
import "./destaques.css";

export default function Destaques({ stories = [] }) {
  const [activeStories, setActiveStories] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);

  // 🔹 Destaques fixos
  const highlights = [
    {
      title: "DIÁRIO",
      thumb: "src/imagens/ultrassom.jpg",
      stories: [
        { url: "src/imagens/ultrassom.jpg" },
        { url: "src/imagens/bbCozinhando.jpg" },
        { url: "src/imagens/coelinhas.jpg" },

      ],
    },
    {
      title: "MESES",
      thumb: "src/imagens/bebeEstudio2.jpg",
      stories: [
        { url: "src/imagens/bebeEstudio2.jpg" },
        { url: "src/imagens/bbEstudio.jpg" },
        { url: "src/imagens/girafa.jpg" },

      ],
    },
    {
      title: "PASSEIOS",
      thumb: "src/imagens/2bebes.jpg",
      stories: [{ url: "src/imagens/2bebes.jpg" }],
    },
  ];

  // 🔹 Adiciona stories enviados pelo Profile
  const userHighlight =
    stories.length > 0
      ? [
          {
            title: "Meus Stories",
            thumb: stories[0].url, // usa o primeiro como thumb
            stories: stories.map((s) => ({ url: s.url })),
          },
        ]
      : [];

  // 🔹 Junta os stories dinâmicos com os fixos
  const allHighlights = [...userHighlight, ...highlights];

  const closeStories = () => {
    setActiveStories(null);
    setStoryIndex(0);
  };

  const nextStory = () => {
    if (storyIndex < activeStories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      closeStories();
    }
  };

  const prevStory = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    }
  };

  const handleTap = (e) => {
    const { clientX } = e.nativeEvent;
    const { width } = e.currentTarget.getBoundingClientRect();
    if (clientX < width / 2) prevStory();
    else nextStory();
  };

  return (
    <div className="highlights">
      {allHighlights.map((highlight, index) => (
        <div
          key={index}
          className="highlight-circle"
          onClick={() => setActiveStories(highlight.stories)}
        >
          <img src={highlight.thumb} alt={highlight.title} />
          <p className="highlight-title">{highlight.title}</p>
        </div>
      ))}

      {activeStories && (
        <div className="stories-overlay">
          <div className="stories-container" onClick={handleTap}>
            <button
              className="close-btn"
              onClick={(e) => {
                e.stopPropagation();
                closeStories();
              }}
            >
              ×
            </button>

            <div className="stories-wrapper">
              <Stories
                stories={activeStories}
                defaultInterval={5000}
                width="100%"
                height="100%"
                currentIndex={storyIndex}
                loop={false}
                onStoryEnd={nextStory}
              />
            </div>

            {/* Botões para desktop */}
            <button className="prev-btn" onClick={prevStory}>
              ‹
            </button>
            <button className="next-btn" onClick={nextStory}>
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
