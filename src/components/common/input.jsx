import { css } from "styled-components";
import { Gray3, Red, StudyLilac } from "../../styles/colors";
import { Caption } from "../../styles/fonts";

export const InputStyle = css`
  border: 1px ${Gray3} solid;
  border-radius: 6px;
  outline: none;
  height: 40px;

  &:focus {
    border: 1px ${StudyLilac} solid;
  }
`;

export const ErrorBoxStyle = css`
  position: relative;
  height: 20px;
  width: 100%;
`;

export const ErrorMessageStyle = css`
  ${Caption}
  color: ${Red};
  position: absolute;
`;
