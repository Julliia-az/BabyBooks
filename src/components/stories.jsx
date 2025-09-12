import React, { useState } from "react";
import Stories from "react-insta-stories";

export default function HighlightStories({ stories: newStories }) {
  const [activeStories, setActiveStories] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);

  // Stories fixos
  const highlights = [
    {
      title: "@mamãe_da_Malu",
      thumb: "src/imagens/coelinhas.jpg",
      stories: [
        { url: "src/imagens/coelhinhas.jpg" },
        { url: "src/imagens/bbCozinhando.jpg" },
      ],
    },{
      title: "mamãe_Clarinha",
      thumb: "src/imagens/girafa.jpg",
      stories: [
        { url: "src/imagens/coelhinhas.jpg" },
      ],
    },
    {
      title: "@MyBabyStory",
      thumb: "src/imagens/bebeEstudio2.jpg",
      stories: [
        { url: "src/imagens/girafa.jpg" },
        { url: "src/imagens/bbEstudio.jpg" },
        { url: "src/imagens/girafa.jpg" },
      ],
    },
    {
      title: "@papai_Anthony ",
      thumb: "src/imagens/2bebes.jpg",
      stories: [
        { url: "src/imagens/2bebes.jpg" },
      ],
    },
  ];

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
    <div className="highlights" style={{ flexDirection: "column", position: "fixed", top: "80px", left:"0", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", padding: "10px 5px", width: "90px", height:"calc(100%-80px)", borderRight: "1px solid #eee", zIndex: "1000" }}>
      {highlights.map((highlight, index) => (
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
