import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { getFormattedDate } from "util/date";
import { useSelector, useDispatch } from "react-redux";
import { __deleteLetter, __editLetter } from "redux/modules/letters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../axios/api";
import { setLogout } from "redux/modules/authSlice";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const letters = useSelector((state) => state.letters);

  const currentUser = useSelector((state) => state.loginState);

  const isLogin = useSelector((state) => state.loginState);
  useEffect(() => {
    if (isLogin.isLogined === false) navigate("/login");
  }, [isLogin, navigate]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const { id } = useParams();
  const { userId, avatar, nickname, createdAt, writedTo, content } =
    letters.find((letter) => letter.id === id);

  const editAble = userId === currentUser.userId ? true : false;
  console.log(userId);
  console.log(currentUser.userId);

  const onDeleteBtn = async () => {
    //토큰 유효 여부 확인
    const response = await api
      .get(`/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      .then((res) => {
        const answer = window.confirm("정말로 삭제하시겠습니까?");
        if (!answer) return;
        console.log(res);
        dispatch(__deleteLetter(id));
        navigate("/");
      })
      .catch((err) => {
        alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        console.log(err);
        dispatch(setLogout());
        localStorage.clear();
      });
  };
  const onEditDone = async () => {
    if (!editingText) return toast.error("수정사항이 없습니다.");

    //토큰 유효 여부 확인
    const response = await api
      .get(`/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(__editLetter({ id, editingText }));
        setIsEditing(false);
        setEditingText("");
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

      <Container>
        <Link to="/">
          <HomeBtn>
            <Button text="홈으로" />
          </HomeBtn>
        </Link>

        <DetailWrapper>
          <UserInfo>
            <AvatarAndNickname>
              <Avatar src={avatar} size="large" />
              <Nickname>{nickname}</Nickname>
            </AvatarAndNickname>
            <time>{getFormattedDate(createdAt)}</time>
          </UserInfo>
          <ToMember>To: {writedTo}</ToMember>

          {isEditing ? (
            <>
              <Textarea
                autoFocus
                defaultValue={content}
                onChange={(event) => setEditingText(event.target.value)}
              />
              <BtnsWrapper $editAble={editAble}>
                <Button text="취소" onClick={() => setIsEditing(false)} />
                <Button text="수정완료" onClick={onEditDone} />
              </BtnsWrapper>
            </>
          ) : (
            <>
              <Content>{content}</Content>
              <BtnsWrapper $editAble={editAble}>
                <Button text="수정" onClick={() => setIsEditing(true)} />
                <Button text="삭제" onClick={onDeleteBtn} />
              </BtnsWrapper>
            </>
          )}
        </DetailWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const HomeBtn = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const DetailWrapper = styled.section`
  background-color: #abdced;
  border-radius: 30px;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 700px;
  min-height: 400px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Noto Sans KR";
`;

const AvatarAndNickname = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Nickname = styled.span`
  font-size: 24px;
  margin-left: 30px;
`;

const ToMember = styled.span`
  font-size: 20px;
  font-family: "Noto Sans KR";
  margin: 5px 30px;
`;

const Content = styled.p`
  font-size: 18px;
  line-height: 30px;
  padding: 12px;
  background-color: white;
  border-radius: 12px;
  height: 200px;
`;

const BtnsWrapper = styled.div`
  ${(props) => {
    if (props.$editAble) {
      return css`
        display: flex;
      `;
    }
    return css`
      display: none;
    `;
  }}
  justify-content: flex-end;
  gap: 12px;
`;

const Textarea = styled.textarea`
  font-size: 18px;
  line-height: 30px;
  padding: 12px;
  background-color: white;
  border-radius: 12px;
  height: 200px;
  resize: none;
  color: black;

  font-family: "Noto Sans KR";
`;
