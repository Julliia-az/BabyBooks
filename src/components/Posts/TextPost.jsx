import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ScrollPanel } from "primereact/scrollpanel";

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

const EmptyTab = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export default function TextPosts({ textPosts, setTextPosts }) {
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setTextPosts([newPost, ...textPosts]);
      setNewPost("");
    }
  };

  return (
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
  );
}
