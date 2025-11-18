import styled from "styled-components";
import { Body, Heading5Bold } from "../../styles/fonts";
import { Lilac1, Lilac6, White } from "../../styles/colors";
import { InputStyle } from "../../components/common/input";
import { LilacButtonStyle } from "../../components/common/button";
import { useForm } from "react-hook-form";
import { useAuth } from "../../api/hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
  width: 18rem;
  max-width: 90%;
  flex-shrink: 0;
`;

const LoginLabel = styled.div`
  ${Heading5Bold}
  margin-top: 20px;
`;

const LoginInput = styled.input`
  ${InputStyle}
  width: 100%;
  box-sizing: border-box;
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

const SubButtonBox = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
`;

const SubButton = styled.div`
  ${Body}
  color: ${Lilac6};

  cursor: pointer;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const { loginMutation } = useAuth();

  const onSubmit = (formData) => {
    loginMutation.mutate(formData);
  };

  return (
    <LoginBackground>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginBox>
          <LoginLabel>이메일</LoginLabel>
          <LoginInput {...register("email")} />
          <LoginLabel>비밀번호</LoginLabel>
          <LoginInput type="password" {...register("password")} />
          <ButtonBox>
            <LoginButton type="submit">로그인</LoginButton>
            <SubButtonBox>
              <SubButton onClick={() => navigate("/register")}>
                회원가입
              </SubButton>
              <SubButton>비밀번호 찾기</SubButton>
            </SubButtonBox>
          </ButtonBox>
        </LoginBox>
      </form>
    </LoginBackground>
  );
};

export default LoginPage;
