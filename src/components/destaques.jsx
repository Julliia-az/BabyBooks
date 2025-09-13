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
      thumb: "/imagens/ultrassom.jpg",
      stories: [
        { url: "/imagens/ultrassom.jpg" },
        { url: "/imagens/bbCozinhando.jpg" },
        { url: "/imagens/coelinhas.jpg" },
      ],
    },
    {
      title: "MESES",
      thumb: "/imagens/bebeEstudio2.jpg",
      stories: [
        { url: "/imagens/bebeEstudio2.jpg" },
        { url: "/imagens/bbEstudio.jpg" },
        { url: "/imagens/girafa.jpg" },
      ],
    },
    {
      title: "PASSEIOS",
      thumb: "/imagens/2bebes.jpg",
      stories: [{ url: "/imagens/2bebes.jpg" }],
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
    <div className="highlights-d">
      {allHighlights.map((highlight, index) => (
        <div
          key={index}
          className="highlight-d-circle"
          onClick={() => setActiveStories(highlight.stories)}
        >
          <img src={highlight.thumb} alt={highlight.title} />
          <p className="highlight-d-title">{highlight.title}</p>
        </div>
      ))}

      {activeStories && (
        <div className="stories-d-overlay">
          <div className="stories-d-container" onClick={handleTap}>
            <button
              className="close-d-btn"
              onClick={(e) => {
                e.stopPropagation();
                closeStories();
              }}
            ></button>

            <div className="stories-d-wrapper">
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
            <button className="prev-d-btn" onClick={prevStory}>
              ‹
            </button>
            <button className="next-d-btn" onClick={nextStory}>
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
