import Tabs from "./Tabs";
import styled from "styled-components";
import Layout from "./common/Layout";

export default function Header() {
  return (
    <Container>
      <Layout />
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

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: yellow;
  flex: 1;
  display: flex;
  align-items: center;
`;
