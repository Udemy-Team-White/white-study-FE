import styled from "styled-components";
import { MenuButtonStyle } from "../../../components/common/button";
import { Red } from "../../../styles/colors";

const BottomMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BottomMenuItem = styled.button`
  ${MenuButtonStyle}
  color: ${(props) => props?.color};
`;

const BottomMenuComp = () => {
  return (
    <BottomMenuBox>
      <BottomMenuItem>아이디 변경</BottomMenuItem>
      <BottomMenuItem>비밀번호 변경</BottomMenuItem>
      <BottomMenuItem>로그아웃</BottomMenuItem>
      <BottomMenuItem color={Red}>회원탈퇴</BottomMenuItem>
    </BottomMenuBox>
  );
};

export default BottomMenuComp;
