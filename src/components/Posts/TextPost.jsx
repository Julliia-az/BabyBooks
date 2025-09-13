import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const NewPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  textarea {
    width: 100%;
    min-height: 80px;
    padding: 10px;
    resize: none;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #dbdbdb;
    box-sizing: border-box;
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
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #c6cdbc;
    }
  }

  @media (max-width: 640px) {
    button {
      width: 100%;
      text-align: center;
    }
  }
`;

const TextPostGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const EmptyTabContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const footerButtons = (
  <>
    <Button
      label="Like"
      icon="pi pi-thumbs-up"
      style={{
        backgroundColor: "#c97d68",
        borderColor: "#c97d68",
        color: "white",
      }}
    />
    <Button
      label="Comment"
      icon="pi pi-comment"
      style={{
        marginLeft: "0.5em",
        backgroundColor: "#c6cdbc",
        borderColor: "#c6cdbc",
        color: "white",
      }}
    />
  </>
);

export default function TextPosts({ textPosts, setTextPosts }) {
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      const postObj = {
        title: "Mamãe da Ana",
        subTitle: new Date().toLocaleString("pt-BR", {
          dateStyle: "short",
        }),
        content: newPost,
      };
      setTextPosts([postObj, ...textPosts]);
      setNewPost("");
    }
  };

  return (
    <>
      <NewPostContainer>
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
      </NewPostContainer>

      {textPosts.length > 0 ? (
        <TextPostGridContainer>
          {textPosts.map((post, i) => (
            <Card
              key={i}
              title={post.title}
              subTitle={post.subTitle}
              footer={footerButtons}
              className="mb-4"
              style={{
                width: "100%",
                maxWidth: "600px",
                borderStyle: "double",
                wordBreak: "break-word",
              }}
            >
              <p className="m-0">{post.content}</p>
            </Card>
          ))}
        </TextPostGridContainer>
      ) : (
        <EmptyTabContainer>
          <h2>Nada compartilhado ainda</h2>
          <p>Escreva algo para aparecer nesta seção.</p>
        </EmptyTabContainer>
      )}
    </>
  );
}
