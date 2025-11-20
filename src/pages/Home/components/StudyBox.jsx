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
import { filterStudyType } from "../../../utils/filterStudyType";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";
import {
  CornerTagStyle,
  TagBoxStyle,
  TagStyle,
} from "../../../components/common/button";

const ContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  cursor: pointer;
`;

const OnlineTag = styled.div`
  ${CornerTagStyle}
  cursor: pointer;
`;

const Date = styled.div`
  margin-top: 12px;
  margin-right: 20px;
  color: ${Gray7};
  ${Body}
  cursor: pointer;
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

  cursor: pointer;

  @media (min-width: 767px) {
    min-height: 60px;
    -webkit-line-clamp: 2;
  }
`;

const TagBox = styled.div`
  ${TagBoxStyle}
  overflow: hidden;

  padding: 12px 20px;
  margin: 12px 0;
  box-sizing: border-box;
  max-height: 34px;

  cursor: pointer;
`;

const Tag = styled.div`
  ${TagStyle}
  background-color: ${(props) => (props?.match && StudyLilac) || Lilac2};
  color: ${(props) => (props?.match && White) || Black};

  cursor: pointer;
`;

const ContainerBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const PersonnelBox = styled.div`
  background-color: ${StudyLilac};
  padding: 8px 16px;
  ${BodyBold}
  color: ${White};
  border-radius: 20px 0 12px 0;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1 1 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  max-width: 100%;
  border-radius: 12px;
  background-color: ${Lilac0};

  cursor: pointer;

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

const LinkBox = styled(Link)`
  color: ${Black};

  &:hover {
    color: ${Black};
  }
`;

const StudyBox = ({ data }) => {
  return (
    <Container>
      <LinkBox to={`/study/${data.studyId}`}>
        <ContainerTop>
          <OnlineTag>{filterStudyType(data?.studyType)}</OnlineTag>
          <Date>{formatDate(data?.createAt)}</Date>
        </ContainerTop>
        <Title>{data?.title}</Title>
        <TagBox>
          {data?.categories?.map((tagData, index) => (
            <Tag key={"tag" + index}>{tagData}</Tag>
          ))}
        </TagBox>
        <ContainerBottom>
          <PersonnelBox>
            {data?.currentMembers} / {data?.maxMembers}
          </PersonnelBox>
        </ContainerBottom>
      </LinkBox>
    </Container>
  );
};

export default StudyBox;
