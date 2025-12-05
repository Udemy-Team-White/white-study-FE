import React from "react";
import styled from "styled-components";
import { Gray0, Gray4, Gray9 } from "../../styles/colors";
import { Body } from "../../styles/fonts";

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Copyright>© 2025 YourCompany. All rights reserved.</Copyright>
        <Links>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
          <FooterLink href="#privacy">Privacy Policy</FooterLink>
        </Links>
      </Container>
    </FooterWrapper>
  );
};

// styled-components
const FooterWrapper = styled.footer`
  background-color: ${Gray9};
  color: ${Gray4};
  padding: 20px 0;
  width: 100%;

  ${Body}
`;

const Container = styled.div`
  width: 90%;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
`;

const FooterLink = styled.a`
  color: ${Gray4};
  text-decoration: none;
  ${Body}

  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  margin: 0;
`;

export default Footer;
