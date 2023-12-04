import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LetterCard from "./LetterCard";
import { __setLetter } from "redux/modules/letters";
import { useEffect } from "react";

import axios from "axios";

export default function LetterList() {
  const dispatch = useDispatch();
  const activeMember = useSelector((state) => state.member);

  const fetchData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_LETTER_SERVER_URL}/letters?_sort=createdAt&_order=desc`
    );
    dispatch(__setLetter(data));
  };

  useEffect(() => {
    //데이터 불러오기
    fetchData();
  }, []);

  const letters = useSelector((state) => state.letters);

  const filteredLetters = letters.filter(
    (letter) => letter.writedTo === activeMember
  );
  return (
    <ListWrapper>
      {filteredLetters.length === 0 ? (
        <p>
          {activeMember}에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이
          되어보세요!
        </p>
      ) : (
        filteredLetters.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 600px;
  border-radius: 12px;
  margin-bottom: 150px;

  font-family: "Noto Sans KR";
  text-align: center;
  color: gray;
`;
