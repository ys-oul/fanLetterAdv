import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setMember } from "redux/modules/member";

export default function Tabs() {
  const activeMember = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const onActiveMember = (event) => {
    if (event.target === event.currentTarget) return;

    dispatch(setMember(event.target.textContent));
  };
  return (
    <TabsWrapper onClick={onActiveMember}>
      <Tab $activeMember={activeMember}>카리나</Tab>
      <Tab $activeMember={activeMember}>윈터</Tab>
      <Tab $activeMember={activeMember}>닝닝</Tab>
      <Tab $activeMember={activeMember}>지젤</Tab>
    </TabsWrapper>
  );
}

const TabsWrapper = styled.ul`
  background-image: linear-gradient(to right, #64b3ce, #bda6f6);
  display: flex;
  justify-content: space-between;
  padding: 8px;
  gap: 12px;
  border-radius: 12px;
`;

const Tab = styled.li`
  ${(props) => {
    if (props.$activeMember === props.children) {
      return css`
        background-color: white;
        color: black;
        font-style: italic;
      `;
    }
    return css`
      background-color: transparent;
      color: white;
    `;
  }}

  font-size: 16px;

  width: 70px;
  text-align: center;
  padding: 12px 6px;
  border-radius: 12px;
  cursor: pointer;
  font-family: "Noto Sans KR";
`;
