import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import styled from "styled-components";
import {
  BodyBold,
  Heading2Bold,
  Heading3Bold,
  Heading5Bold,
} from "../../../styles/fonts";

const Embla = styled.div`
  overflow: hidden;
`;

const EmblaContainer = styled.div`
  display: flex;
`;

const EmblaSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  max-width: 1080px;
  padding: 0 3rem;
  box-sizing: border-box;

  margin-left: 4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  aspect-ratio: 16 / 7;

  border-radius: 20px;

  background: ${({ color }) => `
    linear-gradient(45deg, ${color.first} 0%, ${color.last} 100%)
  `};

  @media (min-width: 767px) {
    padding: 0 5.5rem;
  }
`;

const SliderMainText = styled.div`
  text-align: left;
  color: white;

  word-break: keep-all;
  ${Heading3Bold}

  @media (min-width: 767px) {
    ${Heading2Bold}
  }
`;

const SliderText = styled.div`
  text-align: left;
  color: white;

  word-break: keep-all;
  ${BodyBold}

  @media (min-width: 767px) {
    ${Heading5Bold}
  }
`;

useEmblaCarousel.globalOptions = { loop: true };

const HomeCarousel = () => {
  const [options, setOptions] = useState({ loop: true });
  const [emblasRef] = useEmblaCarousel(options);

  const toggleLoop = useCallback(() => {
    setOptions((currentOptions) => ({
      ...currentOptions,
      loop: !currentOptions.loop,
    }));
  }, []);

  return (
    <Embla ref={emblasRef}>
      <EmblaContainer>
        <EmblaSlide color={{ first: "#CA6DE9", last: "#C767FF" }}>
          <SliderText>지금바로</SliderText>
          <SliderMainText>스터디에 참여하세요!</SliderMainText>
        </EmblaSlide>
        <EmblaSlide color={{ first: "#C767FF", last: "#8880FF" }}>
          <SliderText>모은 포인트로</SliderText>
          <SliderMainText>프로필 꾸미러 가기!</SliderMainText>
        </EmblaSlide>
        <EmblaSlide color={{ first: "#8880FF", last: "#CA6DE9" }}>
          <SliderText>이곳에</SliderText>
          <SliderMainText>광고를 달 수 있어요!</SliderMainText>
        </EmblaSlide>
      </EmblaContainer>
    </Embla>
  );
};

export default HomeCarousel;
