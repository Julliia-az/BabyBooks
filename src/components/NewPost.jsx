import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function NewPost({ addPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title || !content) return;

    const newPost = {
      title,
      user: "@julia", // você pode pegar do usuário logado
      content,
    };

    addPost(newPost);
    navigate("/"); // redireciona para a home
  };

  return (
    <div className="flex flex-column align-items-center pt-6">
      <div className="p-fluid" style={{ width: "600px" }}>
        <h2>Criar Nova Postagem</h2>
        <div className="field mb-3">
          <label htmlFor="title">Título</label>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field mb-3">
          <label htmlFor="content">Conteúdo</label>
          <InputTextarea
            id="content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button label="Publicar" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default NewPost;
