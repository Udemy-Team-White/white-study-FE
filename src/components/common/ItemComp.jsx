import styled from "styled-components";
import { Green, Lilac0, StudyLilac } from "../../styles/colors";
import { BodyBold, Caption, Heading5Bold } from "../../styles/fonts";
import { useEffect, useRef, useState } from "react";
import { LilacButtonStyle } from "./button";

const Card = styled.div`
  background-color: ${Lilac0};
  border-radius: 12px;
  display: flex;
  padding: 12px 20px;
  box-sizing: border-box;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
`;

const ImgBox = styled.image`
  background-color: ${StudyLilac};
  width: 80%;
  aspect-ratio: 1 / 1;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
`;

const ItemFrame = styled.image`
  border: 1px solid Gold;
  width: 100%;
  aspect-ratio: 1 / 1;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const ItemName = styled.div`
  ${BodyBold}
`;

const ItemCaption = styled.div`
  ${Caption}
`;

const Price = styled.div`
  ${Heading5Bold}
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const Button = styled.button`
  ${LilacButtonStyle}
  margin-top: 8px;
  width: 100%;
`;

const ItemComp = () => {
  const imgRef = useRef(null);
  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new ResizeObserver(() => {
      setMarginTop(imgRef.current.offsetHeight / 2);
    });

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Card>
        <ImgBox ref={imgRef} />
        <ItemFrame />
        <ItemName style={{ marginTop: `${marginTop}px` }}>금테</ItemName>
        <ItemCaption>프로필 프레임</ItemCaption>
        <Price>200P</Price>
        <Button>구매하기</Button>
      </Card>
      <div>siasiua</div>
    </>
  );
};

export default ItemComp;
