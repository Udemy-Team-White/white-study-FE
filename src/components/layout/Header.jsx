import { BsRocketTakeoff } from "react-icons/bs";
import styled from "styled-components";
import { BodyBold, ImpactFont } from "../../styles/fonts";
import { Gray3, Lilac6, StudyLilac, White } from "../../styles/colors";
import { useMediaQuery } from "react-responsive";
import { FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IconButtonStyle } from "../common/button";
import { useDispatch } from "react-redux";
import { toggleIsOpen } from "../../store/uiSlice";

const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  background-color: ${White};

  display: flex;
  justify-content: center;

  width: 100%;
  border-bottom: 1px ${Gray3} solid;
  padding: 12px 28px;
  box-sizing: border-box;
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1080px;
`;

const HeaderText = styled.div`
  ${BodyBold}
  color: ${StudyLilac};
  transition: color 0.3s ease;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${Lilac6};
  }
`;

const LogoBox = styled.div`
  display: flex;
  gap: 4px;
  color: ${StudyLilac};
  cursor: pointer;
`;

const LogoTitle = styled.span`
  ${ImpactFont}
  font-size: 24px;
`;

const IconBox = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const StyledFaBellIcon = styled(FaBell)`
  ${IconButtonStyle}
`;

const StyledFaUserIcon = styled(FaUser)`
  ${IconButtonStyle}
`;

const Header = ({ user }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isDesktop = useMediaQuery({ minWidth: 767 });

  return (
    <Container>
      <HeaderBox>
        <LogoBox onClick={() => navigate("/")}>
          <BsRocketTakeoff size={38} />
          <LogoTitle>STUDY</LogoTitle>
        </LogoBox>
        {!user && (
          <HeaderText onClick={() => navigate("/login")}>로그인</HeaderText>
        )}
        {user && (
          <IconBox>
            {isDesktop && (
              <HeaderText onClick={() => navigate("/studyreg")}>
                스터디 개설하기
              </HeaderText>
            )}
            <StyledFaBellIcon size={28} />
            <StyledFaUserIcon
              size={28}
              onClick={() => dispatch(toggleIsOpen())}
            />
          </IconBox>
        )}
      </HeaderBox>
    </Container>
  );
};

export default Header;
