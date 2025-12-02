import styled from "styled-components";
import { Lilac0 } from "../../../styles/colors";
import { PraiseBoxStyle } from "../../../components/common/button";
import { PercentageComp } from "../../../components/common/PercentageComp";

const ScoreBox = styled.div`
  background-color: ${Lilac0};
  padding: 40px 24px;
  width: 100%;
  border-radius: 20px;
  box-sizing: border-box;
`;

const PraiseBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const PraiseList = styled.div`
  ${PraiseBoxStyle}
`;

const ScoreComp = ({ data }) => {
  return (
    <ScoreBox>
      <PraiseBox>
        {data?.praise.map((ele, index) => {
          return (
            <PraiseList key={ele.message + index}>
              {ele.message} - {ele.count}
            </PraiseList>
          );
        })}
      </PraiseBox>
      <PercentageComp
        title={`나의 
신뢰도`}
        number={data?.reliabilityScore}
        unit={`점`}
      />
    </ScoreBox>
  );
};

export default ScoreComp;
