import { useParams } from "react-router-dom";
import Layout from "components/common/Layout";
import styled from "styled-components";
import Profile from "components/Profile";

export default function Mypage() {
  const { userId } = useParams();
  console.log(userId);
  return (
    <>
      <Container>
        <Layout />
        <Profile />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
