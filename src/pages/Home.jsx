import AddForm from "components/AddForm";
import Header from "components/Header";
import LetterList from "components/LetterList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const isLogin = useSelector((state) => state.loginState);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin.isLogined === false) navigate("/login");
  }, [isLogin, navigate]);

  return (
    <Container>
      <Header />
      <AddForm />
      <LetterList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
