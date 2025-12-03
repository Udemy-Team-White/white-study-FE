import styled from "styled-components";
import ItemComp from "../../components/common/ItemComp";

const Container = styled.div`
  max-width: 1080px;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr;
  padding: 24px;
  box-sizing: border-box;
  margin: auto;
  @media (min-width: 450px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StorePage = () => {
  return (
    <Container>
      <ItemComp />
    </Container>
  );
};

export default StorePage;
