import styled from "styled-components";
// Temas
export const light = {
  body: "#fff",
  text: "#222",
  detail: "#262626",
  border: "#dbdbdb",
  card: "#fff",
  cardAlt: "#f0f0f0",
  primary: "#c97d68",
  primaryHover: "#c6cdbc",
};

export const dark = {
  body: "#111",
  text: "#fafafa",
  detail: "#e0e0e0",
  border: "#333",
  card: "#1a1a1a",
  cardAlt: "#2a2a2a",
  primary: "#c97d68",
  primaryHover: "#a86b58",
};

// 🎨 Styled-components que usam o tema
export const FollowButton = styled.button`
  padding: 6px 16px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 600;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

export const Caption = styled.div`
  padding: 4px 6px;
  font-size: 13px;
  text-align: center;
  background-color: ${({ theme }) => theme.card};
  font-family: monospace;
  color: ${({ theme }) => theme.detail};
`;

export const TextPost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.cardAlt};
  border-radius: 8px;
  word-break: break-word;
  text-align: center;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;
