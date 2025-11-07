import { css } from "styled-components";
import {
  Gray1,
  Gray2,
  Gray3,
  Green,
  Green1,
  Green2,
  Lilac1,
  Lilac2,
  Lilac3,
  Lilac7,
  Red,
  Red1,
  Red2,
  StudyLilac,
  White,
} from "../../styles/colors";
import { Body, BodyBold } from "../../styles/fonts";

export const GrayButtonStyle = css`
  background-color: ${Gray1};
  border: 1px ${Gray1} solid;
  ${Body}
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: ${Gray2};
  }
  &:active {
    background-color: ${Gray3};
  }
`;

export const BasicButtonStyle = css`
  background-color: ${White};
  border: 1px ${StudyLilac} solid;
  color: ${StudyLilac};
  ${BodyBold}
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  &:hover {
    background-color: ${Lilac1};
  }
  &:active {
    background-color: ${Lilac2};
  }
`;

export const LilacButtonStyle = css`
  background-color: ${StudyLilac};
  border: 1px ${StudyLilac} solid;
  color: ${White};
  ${BodyBold}
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  &:hover {
    background-color: ${Lilac3};
  }
  &:active {
    background-color: ${Lilac2};
  }
`;

export const RedButtonStyle = css`
  background-color: ${Red};
  border: 1px ${Red} solid;
  color: ${White};
  ${BodyBold}
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  &:hover {
    background-color: ${Red2};
  }
  &:active {
    background-color: ${Red1};
  }
`;

export const GreenButtonStyle = css`
  background-color: ${Green};
  border: 1px ${Green} solid;
  color: ${White};
  ${BodyBold}
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  &:hover {
    background-color: ${Green2};
  }
  &:active {
    background-color: ${Green1};
  }
`;

export const MenuButtonStyle = css`
  background-color: ${White};
  border-radius: 0;
  border-top: 1px ${Gray3} solid;
  ${Body}
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  &:hover {
    background-color: ${Gray1};
  }
  &:active {
    background-color: ${Gray2};
  }
`;

export const PraiseBoxStyle = css`
  background-color: ${StudyLilac};
  padding: 4px 24px;
  border-radius: 6px;
  ${BodyBold}
  color: ${White};
`;

export const IconButtonStyle = css`
  color: ${StudyLilac};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${Lilac7};
  }
`;
