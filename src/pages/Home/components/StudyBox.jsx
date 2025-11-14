import styled from "styled-components";
import { Body, BodyBold, Caption, Heading5Bold } from "../../../styles/fonts";
import {
  Black,
  Gray7,
  Lilac0,
  Lilac1,
  Lilac2,
  Lilac4,
  StudyLilac,
  White,
} from "../../../styles/colors";

const ContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const OnlineTag = styled.div`
  background-color: ${StudyLilac};
  padding: 8px 16px;
  ${BodyBold}
  color: ${White};
  border-radius: 12px 0 20px 0;
`;

const Date = styled.div`
  margin-top: 12px;
  margin-right: 20px;
  color: ${Gray7};
  ${Body}
`;

const Title = styled.div`
  ${Heading5Bold}
  margin: 0 20px;
  min-height: 30px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: keep-all;
  text-align: left;

  @media (min-width: 767px) {
    min-height: 60px;
    -webkit-line-clamp: 2;
  }
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  gap: 8px;

  width: 100%;
  padding: 12px 20px;
  margin: 12px 0;
  box-sizing: border-box;
  max-height: 34px;
`;

const Tag = styled.div`
  background-color: ${(props) => (props?.match && StudyLilac) || Lilac2};
  color: ${(props) => (props?.match && White) || Black};
  ${Caption}
  padding: 4px 8px;
  border-radius: 4px;

  word-break: keep-all;
`;

const ContainerBottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PersonnelBox = styled.div`
  background-color: ${StudyLilac};
  padding: 8px 16px;
  ${BodyBold}
  color: ${White};
  border-radius: 20px 0 12px 0;
`;

const Container = styled.div`
  flex: 1 1 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  max-width: 100%;
  border-radius: 12px;
  background-color: ${Lilac0};

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${Lilac2};
  }

  &:hover ${OnlineTag} {
    background-color: ${Lilac4};
  }

  &:hover ${Tag} {
    background-color: ${(props) => (props?.match && Lilac4) || Lilac1};
  }

  &:hover ${PersonnelBox} {
    background-color: ${Lilac4};
  }

  @media (min-width: 767px) {
    flex: 1 1 calc(50% - 24px);
    max-width: calc(50% - 12px);
  }
`;

const StudyBox = () => {
  return (
    <Container>
      <ContainerTop>
        <OnlineTag>온·오프라인</OnlineTag>
        <Date>2025. 10. 25</Date>
      </ContainerTop>
      <Title>영어 스터디원 모집 두 줄까지 출력 가능</Title>
      <TagBox>
        <Tag>데이터베이스</Tag>
        <Tag>데이터베이스</Tag>
        <Tag>데이터베이스</Tag>
        <Tag>데이터베이스</Tag>
        <Tag>데이터베이스</Tag>
        <Tag>데이터베이스</Tag>
      </TagBox>
      <ContainerBottom>
        <PersonnelBox> 3 / 5</PersonnelBox>
      </ContainerBottom>
    </Container>
  );
};

export default StudyBox;
