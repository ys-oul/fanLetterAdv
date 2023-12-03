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
        <button onClick={() => homeBtnHandler()}>HOME</button>
        <Div>
          <button onClick={() => myProfileHandler()}>내 프로필</button>
          <button onClick={() => logoutHandler()}>로그아웃</button>
        </Div>
      </Nav>
    </>
  );
}

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 60px;
  /* position: absolute; */
  width: 100%;
  background-image: linear-gradient(to right, #64b3ce, #bda6f6);

  margin-bottom: 10px;
`;

const Div = styled.div`
  display: flex;
`;
