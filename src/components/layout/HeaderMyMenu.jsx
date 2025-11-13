import styled from "styled-components";
import { Gray3, Red, White } from "../../styles/colors";
import { MenuButtonStyle } from "../common/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/hooks/useAuth";

const Container = styled.div`
  position: fixed;
  z-index: 999;
  width: 8rem;

  background-color: ${White};
  top: 60px;
  right: 0;

  border: 1px ${Gray3} solid;
  border-radius: 12px;

  overflow: hidden;
`;

const MenuButton = styled.button`
  ${MenuButtonStyle}
  width: 100%;
  border-top: ${(props) => props?.borderTop};
  color: ${(props) => props?.color};
`;

const HeaderMyMenu = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  return (
    <Container>
      <MenuButton borderTop="none" onClick={() => navigate("/my")}>
        마이페이지
      </MenuButton>
      <MenuButton color={Red} onClick={handleLogout}>
        로그아웃
      </MenuButton>
    </Container>
  );
};

export default HeaderMyMenu;
