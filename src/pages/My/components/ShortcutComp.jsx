import { FaBookOpen, FaStore } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import { Gray7, Lilac0, Lilac7 } from "../../../styles/colors";
import { Caption, Heading5Bold } from "../../../styles/fonts";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 24px;
  gap: 12px;
`;

const ShortcutBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media (min-width: 767px) {
    gap: 1.5rem;
    flex-direction: row;
  }
`;

const ShortcutTitle = styled.div`
  ${Heading5Bold}
`;

const Shortcut = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: ${Lilac0};
  padding: 1rem 1.5rem;
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;

  cursor: pointer;
`;

const ShortcutTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.75rem;
  cursor: pointer;
`;

const ShortcutText = styled.div`
  ${Heading5Bold}
  cursor: pointer;
`;

const ShortcutCaption = styled.a`
  ${Caption}
  display: flex;
  align-items: center;
  color: ${Gray7};
`;

const ShortcutComp = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ShortcutTitle>바로가기</ShortcutTitle>

      <ShortcutBox>
        <Shortcut onClick={() => navigate(`/my/study`)}>
          <FaBookOpen size={60} color={Lilac7} />
          <ShortcutTextBox>
            <ShortcutText>나의 스터디</ShortcutText>
            <ShortcutCaption>
              바로가기 <IoIosArrowForward />
            </ShortcutCaption>
          </ShortcutTextBox>
        </Shortcut>

        <Shortcut onClick={() => navigate(`/store`)}>
          <FaStore size={60} color={Lilac7} />
          <ShortcutTextBox>
            <ShortcutText>아이템 상점</ShortcutText>
            <ShortcutCaption>
              바로가기 <IoIosArrowForward />
            </ShortcutCaption>
          </ShortcutTextBox>
        </Shortcut>
      </ShortcutBox>
    </Container>
  );
};

export default ShortcutComp;
