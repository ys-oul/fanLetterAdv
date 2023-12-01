import Tabs from "./Tabs";
import styled from "styled-components";
import { setLogout } from "redux/modules/authSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setLogout());
    localStorage.clear();
  };
  return (
    <Container>
      <Nav>
        <button>HOME</button>
        <Div>
          <button>내 프로필</button>
          <button onClick={() => logoutHandler()}>로그아웃</button>
        </Div>
      </Nav>
      <Title>에스파 팬레터함</Title>
      <Tabs />
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 300px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24px;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 60px;
  position: absolute;
  width: 100%;
  background-color: black;
`;

const Div = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: yellow;
  flex: 1;
  display: flex;
  align-items: center;
`;
