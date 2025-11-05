import styled from "styled-components";
import { Lilac7, StudyLilac, White } from "../../styles/colors";
import { Heading3Black, ImpactFont } from "../../styles/fonts";

const PercentageBox = styled.div`
  background-color: ${StudyLilac};
  padding: 20px;
  border-radius: 15px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  text-align: left;
  white-space: pre;
  ${Heading3Black}
  color: ${White};
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Impact = styled.div`
  ${ImpactFont}
  color: ${White};
  line-height: 0.8;
`;

const PercentageBackground = styled.div`
  background-color: ${Lilac7};
  width: 100%;
  height: 12px;
  margin-top: 12px;
  border-radius: 99px;
`;

const PercentageGauge = styled.div`
  background-color: ${White};
  width: ${(props) => props.width};
  height: 12px;
  border-radius: 99px;
`;

export const PercentageComp = ({ title, number, unit }) => {
  return (
    <PercentageBox>
      <TextBox>
        <Title>{title}</Title>
        <ScoreBox>
          <Impact>{number}</Impact>
          <Title>{unit}</Title>
        </ScoreBox>
      </TextBox>
      <PercentageBackground>
        <PercentageGauge width={number + "%"} />
      </PercentageBackground>
    </PercentageBox>
  );
};
