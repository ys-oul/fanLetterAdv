import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import defaultImg from "../assets/personIcon.png";
import { useState, useEffect } from "react";
import { __editInfo } from "redux/modules/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const { accessToken, isLogined, avatar, nickname, userId } = useSelector(
    (state) => state.loginState
  );

  useEffect(() => {
    if (isLogined === false) navigate("/login");
  }, [isLogined, navigate]);

  const [isEdit, SetIsEdit] = useState(false);
  const [editName, SetEditName] = useState(nickname);
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(avatar);

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };
  const openEditHandler = () => {
    SetIsEdit(true);
  };
  const EditHandler = () => {
    dispatch(
      __editInfo({
        accessToken: accessToken,
        nickname: editName,
        imgFile: imageSrc,
      })
    );
    SetIsEdit(false);
  };

  return (
    <>
      <Div>
        <H2>프로필 관리</H2>
        <Img src={imageSrc || defaultImg} alt="" />
        {!isEdit ? (
          <>
            <Name>{editName}</Name>
            <UserId>{userId}</UserId>
            <EditBtn onClick={() => openEditHandler()}>수정하기</EditBtn>
          </>
        ) : (
          <>
            <InputName
              type="text"
              placeholder={nickname}
              onChange={(event) => SetEditName(event.target.value)}
            />
            <InputImg
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => onUpload(e)}
            />
            <EditBtn onClick={() => EditHandler()}>수정 완료</EditBtn>
          </>
        )}
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 80px;
  height: 400px;
  width: 400px;
  border-radius: 20px;
  padding: 20px;

  background-color: white;
  box-shadow: 2px 2px #e3e3e3;

  font-family: "Noto sans KR";
`;

const H2 = styled.h2`
  margin: 23px;
  font-size: 20px;
  color: #474747;
`;

const Img = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;

const Name = styled.p`
  margin: 20px 0px;
  font-size: 20px;
  font-weight: bold;
`;

const InputName = styled.input`
  margin: 15px 0px;

  padding: 5px;
  border-radius: 10px;
  border: 0.5px solid gray;

  font-family: inherit;
  text-align: center;
  font-size: 15px;
`;

const InputImg = styled.input`
  margin: 5px 0px;
`;

const UserId = styled.p`
  margin-bottom: 20px;
  color: #a5a5a5;
  font-style: italic;
`;

const EditBtn = styled.button`
  border: none;
  background-color: transparent;
  font-family: inherit;
  color: #575757;
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`;
