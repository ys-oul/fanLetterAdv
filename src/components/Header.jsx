import Tabs from "./Tabs";
import styled from "styled-components";
import Layout from "./common/Layout";
import headerImg from "../assets/aespaHeader.jpg";

export default function Header() {
  return (
    <Container>
      <Layout />
      <Title>Aespa fanletters</Title>
      <Tabs />
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 500px;
  background-image: url(${headerImg});
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24px;
`;

const Title = styled.h1`
  font-family: "Racing Sans One";
  font-size: 64px;
  color: white;
  text-shadow: 2px 2px #8d72d2;
  font-style: italic;
  flex: 1;
  display: flex;
  align-items: center;
`;
