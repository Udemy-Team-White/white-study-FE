import styled from "styled-components";
import { Gray4 } from "../../../styles/colors";
import { Body, Heading4Bold } from "../../../styles/fonts";
import { BiSolidEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { InputStyle } from "../../../components/common/input";
import {
  GrayButtonStyle,
  IconButtonStyle,
  LilacButtonStyle,
} from "../../../components/common/button";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { usePatchMyInfo } from "../../../api/queries/usePatchMyInfo";

const ProfileBox = styled.div`
  margin: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: stretch;
    gap: 1.75rem;
  }
`;

const ProfileImg = styled.img`
  background-color: ${Gray4};
  height: 7.5rem;
  width: 7.5rem;
  border-radius: 12px;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  object-fit: cover;

  @media (min-width: 767px) {
    height: 10rem;
    width: 10rem;
  }
`;

const ProfileBioBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-grow: 1;
  width: 100%;

  @media (min-width: 767px) {
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

const ProfileNicknameBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  width: 100%;

  @media (min-width: 767px) {
    justify-content: flex-start;
    gap: 1rem;
  }
`;

const ProfileNickname = styled.div`
  ${Heading4Bold}
`;

const ProfileBio = styled.div`
  ${Body}
  text-align: left;
`;

const NameInput = styled.input`
  ${InputStyle}
  width: 100%;
`;

const BioTextarea = styled.textarea`
  ${InputStyle}
  resize: none;
  height: 112px;

  @media (min-width: 767px) {
    flex-grow: 1;
    height: 100%;
    min-height: 0;
    width: 100%;
    box-sizing: border-box;
  }
`;

const BioEditButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-shrink: 0;
`;

const CancleButton = styled.button`
  ${GrayButtonStyle}
  width: 100%;

  @media (min-width: 767px) {
    width: 3.75rem;
  }
`;

const EditButton = styled.button`
  ${LilacButtonStyle}
  width: 100%;

  @media (min-width: 767px) {
    width: 3.75rem;
  }
`;

const StyledBiSolidEditIcon = styled(BiSolidEdit)`
  ${IconButtonStyle}
`;

const ProfileComp = ({ data }) => {
  const [isEditable, setIsEditable] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 767 });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: { username: data?.username || "", bio: data?.bio || "" },
  });

  const { mutate } = usePatchMyInfo();

  const onSubmit = (formData) => {
    mutate(formData);
    console.log("수정된 데이터: ", formData);
    // 서버 전송 로직
    setIsEditable(false);
  };

  const handleCancel = () => {
    reset({
      username: data?.username,
      bio: data?.bio,
    });
    setIsEditable(false);
  };

  useEffect(() => {
    if (data) {
      reset({ username: data.username, bio: data.bio });
    }
  }, [data]);

  return (
    <>
      {isEditable ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileBox>
            <ProfileImg src={data?.imgUlr} />
            <ProfileBioBox>
              <ProfileNicknameBox>
                <NameInput
                  {...register("username", {
                    maxLength: {
                      value: 10,
                      message: "닉네임은 10자 이내로 입력해주세요.",
                    },
                  })}
                  maxLength={10}
                />
                {isDesktop && (
                  <BioEditButtonBox>
                    <CancleButton onClick={handleCancel}>취소</CancleButton>
                    <EditButton type="submit">완료</EditButton>
                  </BioEditButtonBox>
                )}
              </ProfileNicknameBox>
              <BioTextarea
                {...register("bio", {
                  maxLength: {
                    value: 500,
                    message: "소개글은 500자 이내로 입력해주세요.",
                  },
                })}
                maxLength={500}
              />
              {!isDesktop && (
                <BioEditButtonBox>
                  <CancleButton onClick={handleCancel}>취소</CancleButton>
                  <EditButton type="submit">완료</EditButton>
                </BioEditButtonBox>
              )}
            </ProfileBioBox>
          </ProfileBox>
        </form>
      ) : (
        <ProfileBox>
          <ProfileImg src={data?.imgUlr} />
          <ProfileBioBox>
            <ProfileNicknameBox>
              <ProfileNickname>{data?.username}</ProfileNickname>
              <StyledBiSolidEditIcon
                size={24}
                onClick={() => setIsEditable(true)}
              />
            </ProfileNicknameBox>
            <ProfileBio>{data?.bio}</ProfileBio>
          </ProfileBioBox>
        </ProfileBox>
      )}
    </>
  );
};

export default ProfileComp;
