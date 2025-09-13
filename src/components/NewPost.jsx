import React, { useState } from "react";
import styled from "styled-components";
import TextPosts from "./Posts/TextPost.jsx";

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #c6cdbc;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 1;
  @media (min-width: 768px) {
    padding: 30px;
  }

  @media (min-width: 1200px) {
    width: 80%;
  }
`;

const PostCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 18px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const PostTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const PostUser = styled.p`
  margin: 0;
  font-size: 14px;
  color: #888;
`;

const PostContent = styled.p`
  margin: 12px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #444;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const Button = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;

  &.like {
    background: #c97d68;
    color: white;
  }
  &.like:hover {
    background: #b06b59;
  }

  &.comment {
    background: #c97d68;
    color: white;
  }
  &.comment:hover {
    background: #b06b59;
  }
`;

export default function NewPost() {
  const [tab] = useState("textos");
  const [textPosts, setTextPosts] = useState([]);
  const [posts] = useState([]);

  return (
    <Container>
      {tab === "textos" && (
        <>
          {posts.map((post, index) => (
            <PostCard key={index}>
              <PostTitle>{post.title}</PostTitle>
              <PostUser>{post.user}</PostUser>
              <PostContent>{post.content}</PostContent>
              <Actions>
                <Button className="like">Like</Button>
                <Button className="comment">Comment</Button>
              </Actions>
            </PostCard>
          ))}

          <TextPosts textPosts={textPosts} setTextPosts={setTextPosts} />
        </>
      )}
    </Container>
  );
}
