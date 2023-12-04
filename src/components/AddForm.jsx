import { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Button from "./common/Button";
import { useDispatch, useSelector } from "react-redux";
import { __addLetter } from "redux/modules/letters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../axios/api";
import { setLogout } from "redux/modules/authSlice";

export default function AddForm() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.loginState);
  const nickname = userInfo.nickname;
  const [content, setContent] = useState("");
  const [member, setMember] = useState("카리나");

  const onAddLetter = async (event) => {
    event.preventDefault();
    if (!content) return toast.error("팬레터를 입력하세요");

    const newLetter = {
      id: uuid(),
      nickname,
      content,
      avatar: userInfo.avatar,
      writedTo: member,
      createdAt: new Date(),
      userId: userInfo.userId,
    };

    //access 토큰 유효 여부 확인
    const response = await api
      .get(`/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(__addLetter(newLetter));
        setContent("");
      })
      .catch((err) => {
        alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        console.log(err);
        dispatch(setLogout());
        localStorage.clear();
      });
  };

  return (
    <>
      <ToastContainer />
      <Form onSubmit={onAddLetter}>
        <InputWrapper>
          <label>닉네임:</label>
          <p>{nickname}</p>
        </InputWrapper>
        <InputWrapper>
          <label>내용:</label>
          <textarea
            placeholder="최대 100글자까지 작성할 수 있습니다."
            maxLength={100}
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
        </InputWrapper>
        <SelectWrapper>
          <label>누구에게 보내실 건가요?</label>
          <select onChange={(event) => setMember(event.target.value)}>
            <option>카리나</option>
            <option>윈터</option>
            <option>닝닝</option>
            <option>지젤</option>
          </select>
        </SelectWrapper>
        <Button text="팬레터 등록" />
      </Form>
    </>
  );
}

const Form = styled.form`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 600px;
  border-radius: 12px;
  margin: 20px 0;
  font-family: "Noto Sans KR";
`;

const InputWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & label {
    width: 80px;
  }
  & textarea {
    width: 100%;
    resize: none;
    height: 80px;
    font-family: "Noto Sans KR";
    padding: 12px;
  }
`;

const SelectWrapper = styled(InputWrapper)`
  font-family: "Noto Sans KR";

  justify-content: flex-start;
  & label {
    width: 170px;
  }
`;
