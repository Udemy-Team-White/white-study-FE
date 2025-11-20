import styled from "styled-components";
import { Lilac0 } from "../../styles/colors";
import { setIsModalOpen } from "../../store/modalSlice";
import { useDispatch } from "react-redux";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;
  box-sizing: border-box;
`;

const ModalBox = styled.div`
  background-color: ${(props) => props.$bgColor || Lilac0};
  width: 100%;
  max-width: 540px;
  padding: 24px;
  border-radius: 16px;
  box-sizing: border-box;

  max-height: 90vh;
  overflow-y: auto;
`;

const Modal = ({ children, bgColor }) => {
  const dispatch = useDispatch();

  return (
    <Overlay onClick={() => dispatch(setIsModalOpen(false))}>
      <ModalBox $bgColor={bgColor} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalBox>
    </Overlay>
  );
};

export default Modal;
