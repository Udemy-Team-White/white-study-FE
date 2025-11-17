import { useMemo } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import styled, { css } from "styled-components";
import { Lilac7, StudyLilac } from "../../styles/colors";
import { Body, BodyBold } from "../../styles/fonts";

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonSize = css`
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${Body}

  cursor: pointer;

  transition: color 0.3s ease;
  &:hover {
    color: ${Lilac7};
  }
`;

const ButtonBox = styled.div`
  ${ButtonSize};
  color: ${(props) => props.$active && StudyLilac};
  ${(props) => props.$active && BodyBold}
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isDesktop = useMediaQuery({ minWidth: 767 });
  const maxButtons = isDesktop ? 7 : 5;

  const pageNumbers = useMemo(() => {
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(currentPage - half, 1);
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxButtons + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages, maxButtons]);

  return (
    <Container>
      <ButtonBox
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <IoMdArrowDropleft size={30} />
      </ButtonBox>
      {pageNumbers.map((num) => (
        <ButtonBox
          key={num}
          $active={num === currentPage}
          onClick={() => onPageChange(num)}
        >
          {num}
        </ButtonBox>
      ))}
      <ButtonBox
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <IoMdArrowDropright size={30} />
      </ButtonBox>
    </Container>
  );
};

export default Pagination;
