import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    validId: false, //id가 유효한가
    pw: "",
    validPw: false, //pw가 유효한가
    pwCheck: "",
    validCheck: false, //pw === pwCheck인가
    nickname: "",
    validNickname: false, //nickname이 유효한가
  });

  const idInputHandler = (event) => {
    const input = event.target.value;
    if (input.length >= 4 && input.length <= 10)
      setForm({ ...form, id: input, validId: true });
    else setForm({ ...form, id: input, validId: false });
  };

  const pwInputHandler = (event) => {
    const input = event.target.value;
    if (input.length >= 4 && input.length <= 15)
      setForm({ ...form, pw: input, validPw: true });
    else setForm({ ...form, pw: input, validPw: false });
  };

  const pwCheckHander = (event) => {
    const input = event.target.value;
    if (input === form.pw)
      setForm({ ...form, pwCheck: input, validCheck: true });
    else setForm({ ...form, pwCheck: input, validCheck: false });
  };

  const nicknameInputHandler = (event) => {
    const input = event.target.value;
    if (input.length >= 1 && input.length <= 10)
      setForm({ ...form, nickname: input, validNickname: true });
    else setForm({ ...form, nickname: input, validNickname: false });
  };

  const isValid =
    form.validId && form.validPw && form.validCheck && form.validNickname
      ? true
      : false;
  console.log(form, isValid);

  return (
    <>
      <Div>
        <SignUpBox>
          <H2>회원가입</H2>

          <Form action="">
            <ul>
              <Li>
                <label>
                  사용할 아이디{" "}
                  <ValidMessage $target={form.id} $valid={form.validId}>
                    아이디가 너무 길거나 짧습니다
                  </ValidMessage>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="아이디 (4~10글자)"
                  onChange={(event) => {
                    idInputHandler(event);
                  }}
                />
              </Li>
              <Li>
                <label>
                  비밀번호{" "}
                  <ValidMessage $target={form.pw} $valid={form.validPw}>
                    비밀번호가 너무 길거나 짧습니다
                  </ValidMessage>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="비밀번호 (4~15글자)"
                  onChange={(event) => {
                    pwInputHandler(event);
                  }}
                />
              </Li>
              <Li>
                <label>
                  비밀번호 확인{" "}
                  <ValidMessage $target={form.pwCheck} $valid={form.validCheck}>
                    비밀번호가 일치하지 않습니다
                  </ValidMessage>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="비밀번호 확인"
                  onChange={(event) => {
                    pwCheckHander(event);
                  }}
                />
              </Li>
              <Li>
                <label>
                  사용할 닉네임{" "}
                  <ValidMessage
                    $target={form.nickname}
                    $valid={form.validNickname}
                  >
                    닉네임이 너무 길거나 짧습니다
                  </ValidMessage>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="닉네임 (1~10글자)"
                  onChange={(event) => {
                    nicknameInputHandler(event);
                  }}
                />
              </Li>
            </ul>
            <SignUpBtn
              $isValid={isValid}
              disabled={!isValid} //버튼 활성화
              onClick={() => console.log("클릭!")}
            >
              회원가입
            </SignUpBtn>
          </Form>
          <LoginBtn onClick={() => navigate("/login")}>로그인</LoginBtn>
        </SignUpBox>
      </Div>
    </>
  );
}

export default SignUp;

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
  background-color: #e9d9fc;
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

const SignUpBtn = styled.button`
  width: 470px;
  height: 40px;
  margin: 10px 15px;

  border: none;
  font-family: inherit;
  font-size: 18px;

  ${(props) => {
    if (props.$isValid === true) {
      return css`
        background-color: #d2affd;
        color: black;
      `;
    }
    return css`
      background-color: #cdd4da;
      color: #a1a6aa;
    `;
  }}
`;

const LoginBtn = styled.p`
  border: none;
  background-color: transparent;

  text-align: center;

  color: gray;
`;

const ValidMessage = styled.span`
  ${(props) => {
    const idInfo = [props.$valid, props.$target];
    if (idInfo[0] === false && idInfo[1].length !== 0) {
      return css`
        display: inline;
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: red;
      `;
    }
    return css`
      display: none;
    `;
  }}
`;
