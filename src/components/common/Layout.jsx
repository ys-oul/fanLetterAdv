import { setLogout } from "redux/modules/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.loginState);

  const homeBtnHandler = () => {
    navigate("/");
  };

  const logoutHandler = () => {
    dispatch(setLogout());
    localStorage.clear();
  };

  const myProfileHandler = () => {
    navigate(`/mypage/${currentUser.userId}`);
  };
  return (
    <>
      <Nav>
        <HomeBtn onClick={() => homeBtnHandler()}>Aesap fanletters</HomeBtn>
        <Div>
          <Btn onClick={() => myProfileHandler()}>내 프로필</Btn>
          <Btn onClick={() => logoutHandler()}>로그아웃</Btn>
        </Div>
      </Nav>
    </>
  );
}

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 60px;
  width: 100%;
  background-image: linear-gradient(to right, #64b3ce, #bda6f6);

  margin-bottom: 10px;
`;

const Div = styled.div`
  display: flex;
`;

const HomeBtn = styled.button`
  background-color: transparent;
  font-family: "Racing Sans One";
  border: none;
  color: white;
  font-size: 25px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Btn = styled.button`
  background-color: transparent;
  font-family: "Noto Sans KR";
  border: none;
  color: white;
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
