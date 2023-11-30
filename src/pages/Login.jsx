import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import api from "../axios/api";
import { useDispatch } from "react-redux";
import { login } from "redux/modules/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    api
      .post(`/login`, { id: form.id, password: form.pw })
      .then((res) => {
        console.log(res);
        const accessToken = res.data.accessToken;
        localStorage.setItem("token", accessToken);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Div>
        <SignUpBox>
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
          <SignUpBtn onClick={() => navigate("/signup")}>회원가입</SignUpBtn>
        </SignUpBox>
      </Div>
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

const SignUpBox = styled.div`
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
