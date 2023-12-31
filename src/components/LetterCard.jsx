import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import Avatar from "./common/Avatar";
import { getFormattedDate } from "util/date";

export default function LetterCard({ letter }) {
  const navigate = useNavigate();

  return (
    <LetterWrapper onClick={() => navigate(`/detail/${letter.id}`)}>
      <UserInfo>
        <Avatar src={letter.avatar} />
        <NicknameAndDate>
          <p>{letter.nickname}</p>
          <time>{getFormattedDate(letter.createdAt)}</time>
        </NicknameAndDate>
      </UserInfo>
      <Content>{letter.content}</Content>
    </LetterWrapper>
  );
}

const LetterWrapper = styled.li`
  background-color: #c7f1ff;

  display: flex;
  flex-direction: column;
  gap: 12px;
  color: black;
  padding: 20px;
  text-align: left;

  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const NicknameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: 10px;
  font-family: "Noto Sans KR";
`;

const Content = styled.p`
  background-color: white;
  border-radius: 12px;
  padding: 12px;
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Noto Sans KR";
`;
