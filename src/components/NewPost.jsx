import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "./Menu";
import TextPosts from "./Posts/TextPost.jsx";

// 🔹 Styled Components
const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 60px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
`;

const PostTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 18px;
`;

const PostUser = styled.p`
  margin: 0;
  font-size: 14px;
  color: gray;
`;

const PostContent = styled.p`
  margin: 12px 0;
  font-size: 15px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  &.like {
    background: #c97d68;
    color: white;
  }

  &.comment {
    background: #c97d68;
    color: white;
  }
`;

export default function NewPost({ addPost }) {
  const [tab, setTab] = useState("textos");
  const [textPosts, setTextPosts] = useState([]);
  const [mediaPosts, setMediaPosts] = useState([]);
  const [posts, setPosts] = useState([ ]);

  return (
    <div>
      <Menu />
      <Container>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
          <button
            onClick={() => setTab("textos")}
            style={{
              fontWeight: tab === "textos" ? 700 : 500,
              borderBottom: tab === "textos" ? "2px solid #000" : "none",
            }}
          >
            TEXTO
          </button>
        </div>

        {/* Conteúdo da aba */}
        {tab === "textos" && (
          <>
            {posts.map((post, index) => (
              <PostCard key={index}>
                <PostTitle>{post.title}</PostTitle>
                <PostUser>{post.user}</PostUser>
                <PostContent>{post.content}</PostContent>
                <Actions>
                  <Button className="like"> Like</Button>
                  <Button className="comment"> Comment</Button>
                </Actions>
              </PostCard>
            ))}

            <TextPosts textPosts={textPosts} setTextPosts={setTextPosts} />
          </>
        )}
      </Container>
    </div>
  );
}
