import AddForm from "components/AddForm";
import Header from "components/Header";
import LetterList from "components/LetterList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { __setLetter } from "redux/modules/letters";

export default function Home() {
  const isLogin = useSelector((state) => state.loginState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:5000/letters");
    dispatch(__setLetter(data));
  };

  useEffect(() => {
    if (isLogin.isLogined === false) navigate("/login");
    //데이터 불러오기
    fetchData();
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
