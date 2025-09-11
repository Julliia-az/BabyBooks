import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "./Menu";

// 🔹 Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 14px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 14px;
  background-color: #c97d68;
  color: white;
  border: none;
  cursor: pointer;
`;

export default function NewPost({ addPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return;

    // Cria o post
    const post = {
      title,
      content,
      user: "@julia", // usuário padrão
    };

    // Adiciona no estado do Home
    addPost(post);

    // Limpa o formulário
    setTitle("");
    setContent("");

    // Redireciona para a Home
    navigate("/");
  };

  return (
    <div>
      <Menu />
      <Container>
        <h2>Novo Post</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Título do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="Escreva seu texto"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
          />
          <Button type="submit">Postar</Button>
        </form>
      </Container>
    </div>
  );
}
