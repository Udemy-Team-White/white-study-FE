import styled from "styled-components";
import {
  Gray1,
  Gray2,
  Gray3,
  Gray4,
  Gray5,
  Gray6,
  Gray7,
  Gray8,
  Gray9,
  Green,
  Green1,
  Green2,
  Green4,
  Green5,
  Lilac1,
  Lilac2,
  Lilac3,
  Lilac4,
  Lilac5,
  Lilac6,
  Lilac7,
  Lilac8,
  Lilac9,
  Red,
  Red1,
  Red2,
  Red4,
  Red5,
  StudyLilac,
  White,
  Yellow,
  Yellow1,
  Yellow2,
  Yellow4,
  Yellow5,
} from "../../styles/colors";
import {
  BasicButtonStyle,
  GrayButtonStyle,
  GreenButtonStyle,
  LilacButtonStyle,
  MenuButtonStyle,
  PraiseBoxStyle,
  RedButtonStyle,
} from "./button";
import { BodyBold, ImpactFont } from "../../styles/fonts";
import { PercentageComp } from "./PercentageComp";
import { InputStyle } from "./input";

const ButtonFlex = styled.div`
  display: flex;
  gap: 20px;
`;

const GrayButton = styled.button`
  width: 120px;
  ${GrayButtonStyle}
`;
const BasicButton = styled.button`
  width: 120px;
  ${BasicButtonStyle}
`;
const LilacButton = styled.button`
  width: 120px;
  ${LilacButtonStyle}
`;
const RedButton = styled.button`
  width: 120px;
  ${RedButtonStyle}
`;
const GreenButton = styled.button`
  width: 120px;
  ${GreenButtonStyle}
`;
const MenuButton = styled.button`
  width: 120px;
  ${MenuButtonStyle}
`;

const ColorFlex = styled.div`
  display: flex;
`;

const ColorBox = styled.div`
  background-color: ${(props) => props.color};
  width: 40px;
  height: 40px;
`;

const Impact = styled.div`
  ${ImpactFont}
`;

const PraiseBox = styled.div`
  ${PraiseBoxStyle}
  ${BodyBold}
  color: ${White};
`;

const Input = styled.input`
  ${InputStyle}
`;

const Example = () => {
  return (
    <>
      <ColorFlex>
        <ColorBox color={Lilac1} />
        <ColorBox color={Lilac2} />
        <ColorBox color={Lilac3} />
        <ColorBox color={StudyLilac} />
        <ColorBox color={Lilac4} />
        <ColorBox color={Lilac5} />
        <ColorBox color={Lilac6} />
        <ColorBox color={Lilac7} />
        <ColorBox color={Lilac8} />
        <ColorBox color={Lilac9} />
      </ColorFlex>
      <ColorFlex>
        <ColorBox color={White} />
        <ColorBox color={Gray1} />
        <ColorBox color={Gray2} />
        <ColorBox color={Gray3} />
        <ColorBox color={Gray4} />
        <ColorBox color={Gray5} />
        <ColorBox color={Gray6} />
        <ColorBox color={Gray7} />
        <ColorBox color={Gray8} />
        <ColorBox color={Gray9} />
      </ColorFlex>
      <ColorFlex>
        <ColorBox color={Red1} />
        <ColorBox color={Red2} />
        <ColorBox color={Red} />
        <ColorBox color={Red4} />
        <ColorBox color={Red5} />
      </ColorFlex>
      <ColorFlex>
        <ColorBox color={Yellow1} />
        <ColorBox color={Yellow2} />
        <ColorBox color={Yellow} />
        <ColorBox color={Yellow4} />
        <ColorBox color={Yellow5} />
      </ColorFlex>
      <ColorFlex>
        <ColorBox color={Green1} />
        <ColorBox color={Green2} />
        <ColorBox color={Green} />
        <ColorBox color={Green4} />
        <ColorBox color={Green5} />
      </ColorFlex>
      <ButtonFlex>
        <GrayButton>회색버튼</GrayButton>
        <BasicButton>기본버튼</BasicButton>
        <MenuButton>메뉴버튼</MenuButton>
      </ButtonFlex>
      <ButtonFlex>
        <LilacButton>진한버튼</LilacButton>
        <RedButton>빨간버튼</RedButton>
        <GreenButton>초록버튼</GreenButton>
      </ButtonFlex>
      <Impact>75</Impact>
      <ButtonFlex>
        <PraiseBox>정리를 잘 해요 - 17회</PraiseBox>
      </ButtonFlex>
      <PercentageComp
        title={`나의 
신뢰 점수`}
        number={75}
        unit={`점`}
      />
      <Input />
    </>
  );
};

export default Example;
