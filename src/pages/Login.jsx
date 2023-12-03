import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import api from "../axios/api";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "redux/modules/authSlice";
import SignUp from "../components/SignUp";

function Login() {
  console.log(useSelector((state) => state.loginState));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState("login");

  const [form, setForm] = useState({
    id: "",
    validId: false, //id가 유효한가
    pw: "",
    validPw: false, //pw가 유효한가
  });

  const idInputHandler = (event) => {
    const input = event.target.value;
    if (input.length > 3) setForm({ ...form, id: input, validId: true });
    else setForm({ ...form, id: input, validId: false });
  };

  const pwInputHandler = (event) => {
    const input = event.target.value;
    if (input.length > 3) setForm({ ...form, pw: input, validPw: true });
    else setForm({ ...form, pw: input, validPw: false });
  };

  const isValid = form.validId && form.validPw ? true : false;

  console.log(form, isValid);

  const loginBtnHandler = async (form) => {
    await api
      // .post(`/login?expiresIn=10m`, { id: form.id, password: form.pw })
      .post(`/login`, { id: form.id, password: form.pw })
      .then((res) => {
        console.log(res.data);
        const { accessToken, userId, avatar, nickname } = res.data;
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ accessToken, userId, avatar, nickname })
        );
        dispatch(setLogin({ accessToken, userId, avatar, nickname }));
        alert("로그인 성공");
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401)
          alert("아이디 또는 비밀번호를 확인하세요");
        console.log(error);
      });
  };

  return (
    <>
      <Div>
        <LoginBox $isOpen={toggle}>
          <H2>로그인</H2>

          <Form
            action=""
            onSubmit={(e) => {
              //로그인 시 새로고침 방지 수정 필요
              e.preventDefault();
              loginBtnHandler(form);
            }}
          >
            <ul>
              <Li>
                <label>아이디</label>
                <Input
                  type="text"
                  required
                  placeholder="아이디 (4~10글자)"
                  onChange={(event) => idInputHandler(event)}
                />
              </Li>
              <Li>
                <label>비밀번호</label>
                <Input
                  type="password"
                  required
                  placeholder="비밀번호 (4~15글자)"
                  onChange={(event) => pwInputHandler(event)}
                />
              </Li>
            </ul>
            <LoginBtn
              $isValid={isValid}
              disabled={!isValid} //버튼 활성화
              onClick={() => console.log("클릭!")}
            >
              로그인
            </LoginBtn>
          </Form>
          <SignUpBtn onClick={() => setToggle("signup")}>회원가입</SignUpBtn>
        </LoginBox>
      </Div>
      <SignUpBox $isOpen={toggle}>
        <SignUp setToggle={setToggle} />
      </SignUpBox>
    </>
  );
}

export default Login;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: "Noto sans KR";
`;

const LoginBox = styled.div`
  ${(props) => {
    if (props.$isOpen === "login") {
      return css`
        display: block;
      `;
    }
    return css`
      display: none;
    `;
  }}
  width: 600px;
  padding: 50px;
  margin-top: 100px;

  border-radius: 15px;
  background-color: #cfe9ff;
`;

const H2 = styled.h2`
  font-size: 32px;
`;

const Form = styled.form`
  margin-top: 30px;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;

  margin: 10px 15px;
  gap: 5px;
`;

const Input = styled.input`
  padding: 5px;
  font-family: inherit;
`;

const LoginBtn = styled.button`
  width: 470px;
  height: 40px;
  margin: 10px 15px;

  border: none;
  font-family: inherit;
  font-size: 18px;

  ${(props) => {
    if (props.$isValid === true) {
      return css`
        background-color: #a0d0f9;
        color: black;
      `;
    }
    return css`
      background-color: #cdd4da;
      color: #a1a6aa;
    `;
  }}
`;

const SignUpBtn = styled.p`
  border: none;
  background-color: transparent;

  text-align: center;

  color: gray;
`;

const SignUpBox = styled.div`
  ${(props) => {
    if (props.$isOpen === "signup") {
      return css`
        display: block;
      `;
    }
    return css`
      display: none;
    `;
  }}
`;
