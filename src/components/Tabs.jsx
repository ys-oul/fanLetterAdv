import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setMember } from "redux/modules/member";
import api from "../axios/api";
import { setLogout } from "redux/modules/authSlice";

export default function Tabs() {
  const activeMember = useSelector((state) => state.member);
  const userInfo = useSelector((state) => state.loginState);
  const dispatch = useDispatch();

  const onActiveMember = async (event) => {
    if (event.target === event.currentTarget) return;

    //access 토큰 유효 여부 확인
    const response = await api
      .get(`/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(setMember(event.target.textContent));
      })
      .catch((err) => {
        alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        console.log(err);
        dispatch(setLogout());
        localStorage.clear();
      });
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
