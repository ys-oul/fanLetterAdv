import styled from "styled-components";

export default function Button({ text, onClick = () => {} }) {
  return (
    <BtnWrapper>
      <button onClick={onClick}>{text}</button>
    </BtnWrapper>
  );
}

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-bottom: 15px;
  margin-right: 10px;

  & button {
    font-family: "Noto Sans KR";
    background-color: #ac8bfd;
    border: none;
    color: white;
    font-size: 15px;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 12px;
    width: 100px;
    height: 35px;
  }
`;
