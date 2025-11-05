import { css } from "styled-components";
import { Gray3, StudyLilac } from "../../styles/colors";

export const InputStyle = css`
  border: 1px ${Gray3} solid;
  padding: 8px 8px;
  border-radius: 6px;
  outline: none;

  &:focus {
    border: 1px ${StudyLilac} solid;
  }
`;
