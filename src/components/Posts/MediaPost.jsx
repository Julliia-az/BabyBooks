import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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

export default function MediaPosts({ mediaPosts, setMediaPosts }) {
  const [newFile, setNewFile] = useState(null);
  const [caption, setCaption] = useState("");

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
            {post.caption && <Caption>{post.caption}</Caption>}
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
  );
}
