import styled from "styled-components";
import { InputStyle } from "../../../components/common/input";
import { LilacButtonStyle } from "../../../components/common/button";
import { Lilac0 } from "../../../styles/colors";
import { useRef } from "react";

const Container = styled.div`
  padding: 24px;
  background-color: ${Lilac0};
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
  max-width: 1080px;
  display: flex;
  gap: 16px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  ${InputStyle}
  flex: 1;
`;

const SearchButton = styled.button`
  ${LilacButtonStyle}
  padding: 8px 32px;
`;

const Searchbar = ({ setKeyword, setCurrentPage }) => {
  const inputRef = useRef("");

  const handleSearch = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    setKeyword(value);
    setCurrentPage(1);
  };

  return (
    <Container as="form" onSubmit={handleSearch}>
      <SearchInput ref={inputRef} />
      <SearchButton type="submit">검색</SearchButton>
    </Container>
  );
};

export default Searchbar;
