import AddForm from "components/AddForm";
import Header from "components/Header";
import LetterList from "components/LetterList";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { __setLetter } from "redux/modules/letters";

export default function Home() {
  const isLogin = useSelector((state) => state.loginState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tmp, setTmp] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_LETTER_SERVER_URL}/letters?_sort=createAt&_order=asc`
    );
    setTmp(data);
  };

  dispatch(__setLetter(tmp));

  useEffect(() => {
    if (isLogin.isLogined === false) navigate("/login");
    //데이터 불러오기
    // fetchData();
    dispatch(__setLetter(tmp));
  }, [isLogin]);

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
