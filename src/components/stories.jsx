import React, { useState } from "react";
import Stories from "react-insta-stories";
import { createPortal } from "react-dom";
import "./stories.css";

export default function HighlightStories() {
  const [activeStories, setActiveStories] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);

  const highlights = [
    {
      title: "@mamãe_da_Malu",
      thumb: "/imagens/coelinhas.jpg",
      stories: [{ url: "/imagens/coelinhas.jpg" }],
    },
    {
      title: "mamãe_Clarinha",
      thumb: "/imagens/girafa.jpg",
      stories: [{ url: "/imagens/girafa.jpg" }],
    },
    {
      title: "@MyBabyStory",
      thumb: "/imagens/bebeEstudio2.jpg",
      stories: [{ url: "/imagens/bbEstudio.jpg" }],
    },
    {
      title: "@papai_Anthony",
      thumb: "/imagens/2bebes.jpg",
      stories: [{ url: "/imagens/2bebes.jpg" }],
    },
  ];

  const closeStories = () => {
    setActiveStories(null);
    setStoryIndex(0);
  };

  const nextStory = () => {
    if (storyIndex < activeStories.length - 1) setStoryIndex(storyIndex + 1);
    else closeStories();
  };

  const prevStory = () => {
    if (storyIndex > 0) setStoryIndex(storyIndex - 1);
  };

  const handleTap = (e) => {
    const { clientX } = e.nativeEvent;
    const { width } = e.currentTarget.getBoundingClientRect();
    if (clientX < width / 2) prevStory();
    else nextStory();
  };

  return (
    <div className="highlights-s">
      {highlights.map((highlight, index) => (
        <div
          key={index}
          className="highlight-s-circle"
          onClick={() => setActiveStories(highlight.stories)}
        >
          <img src={highlight.thumb} alt={highlight.title} />
          <p className="highlight-s-title">{highlight.title}</p>
        </div>
      ))}

      {activeStories &&
        createPortal(
          <div className="stories-s-overlay" onClick={closeStories}>
            <div
              className="stories-s-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-s-btn" onClick={closeStories}>
                X
              </button>

              <div className="stories-s-wrapper">
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

              <button className="prev-s-btn" onClick={prevStory}>
                ‹
              </button>
              <button className="next-s-btn" onClick={nextStory}>
                ›
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
