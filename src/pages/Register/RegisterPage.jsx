import styled from "styled-components";
import {
  BasicButtonStyle,
  LilacButtonStyle,
} from "../../components/common/button";
import { Heading5Bold } from "../../styles/fonts";
import { Lilac1, White } from "../../styles/colors";
import {
  ErrorBoxStyle,
  ErrorMessageStyle,
  InputStyle,
} from "../../components/common/input";
import { useForm } from "react-hook-form";
import { useAuth } from "../../api/hooks/useAuth";
import { useState } from "react";

const LoginBackground = styled.div`
  background-color: ${Lilac1};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background-color: ${White};
  padding: 56px 72px 52px 72px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 23rem;
  max-width: 90%;
  flex-shrink: 0;
`;

const LoginLabel = styled.div`
  ${Heading5Bold}
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const LoginInput = styled.input`
  ${InputStyle}
  width: 100%;
  box-sizing: border-box;
`;

const SubButton = styled.button`
  ${BasicButtonStyle}
  width: 8rem;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const LoginButton = styled.button`
  ${LilacButtonStyle}
  width: 100%;
  margin-top: 20px;
`;

const ErrorBox = styled.div`
  ${ErrorBoxStyle}
`;

const ErrorMessage = styled.div`
  ${ErrorMessageStyle}
`;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");
  const username = watch("username");

  const { checkEmailMutation, checkUsernameMutation, registerMutation } =
    useAuth();

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const handleCheckEmail = async () => {
    const valid = await trigger("email");
    if (!valid) return;

    setEmailError("");
    try {
      const res = await checkEmailMutation.mutateAsync(email);
      alert(res.message);
      setIsEmailChecked(true);
    } catch (err) {
      const msg =
        err.response?.data?.message || "이메일 확인 중 오류가 발생했습니다.";
      setEmailError(msg);
      setIsEmailChecked(false);
    }
  };

  const handleCheckUsername = async () => {
    const valid = await trigger("username");
    if (!valid) return;

    setUsernameError("");
    try {
      const res = await checkUsernameMutation.mutateAsync(username);
      alert(res.message);
      setIsUsernameChecked(true);
    } catch (err) {
      const msg =
        err.response?.data?.message || "닉네임 확인 중 오류가 발생했습니다.";
      setUsernameError(msg);
      setIsUsernameChecked(false);
    }
  };

  const onSubmit = (formData) => {
    if (!isEmailChecked) {
      alert("이메일 중복 확인을 완료해주세요.");
      return;
    }

    if (!isUsernameChecked) {
      alert("닉네임 중복 확인을 완료해주세요.");
      return;
    }

    const { checkPassword, ...filteredData } = formData;
    registerMutation.mutate(filteredData);
  };

  return (
    <LoginBackground>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginBox>
          <LoginLabel>이메일</LoginLabel>
          <InputBox>
            <LoginInput
              {...register("email", { required: "이메일을 입력해주세요." })}
            />
            <SubButton type="button" onClick={handleCheckEmail}>
              중복확인
            </SubButton>
          </InputBox>
          <ErrorBox>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            {!errors.email && emailError && (
              <ErrorMessage>{emailError}</ErrorMessage>
            )}
          </ErrorBox>

          <LoginLabel>비밀번호</LoginLabel>
          <LoginInput
            type="password"
            {...register("password", { required: "비밀번호를 입력해주세요." })}
          />
          <ErrorBox>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </ErrorBox>

          <LoginLabel>비밀번호 확인</LoginLabel>
          <LoginInput
            type="password"
            {...register("checkPassword", {
              required: "비밀번호 확인을 입력해주세요.",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
          />
          <ErrorBox>
            {errors.checkPassword && (
              <ErrorMessage>{errors.checkPassword.message}</ErrorMessage>
            )}
          </ErrorBox>

          <LoginLabel>닉네임</LoginLabel>
          <InputBox>
            <LoginInput
              {...register("username", {
                required: "닉네임을 입력해주세요.",
                maxLength: {
                  value: 10,
                  message: "닉네임은 10자 이내로 입력해주세요.",
                },
              })}
            />
            <SubButton type="button" onClick={handleCheckUsername}>
              중복확인
            </SubButton>
          </InputBox>
          <ErrorBox>
            {!errors.username && usernameError && (
              <ErrorMessage>{usernameError}</ErrorMessage>
            )}
          </ErrorBox>

          <ButtonBox>
            <LoginButton type="submit">회원가입</LoginButton>
          </ButtonBox>
        </LoginBox>
      </form>
    </LoginBackground>
  );
};

export default RegisterPage;
