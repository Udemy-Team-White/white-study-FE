import { createGlobalStyle } from "styled-components";
import {
  Gray2,
  Lilac0,
  Lilac1,
  Lilac3,
  Lilac4,
  StudyLilac,
  White,
} from "../../styles/colors";

export const DatePickerGlobalStyle = createGlobalStyle`
  .react-datepicker {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background-color: ${White};
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 101;
  }

  /* 헤더 */
  .react-datepicker__header {
    background-color: ${Gray2};
    color: ${White};
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .react-datepicker__current-month {
    font-weight: bold;
    font-size: 1rem;
  }

  .react-datepicker__navigation {
    top: 12px;
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${White};
  }

  /* 요일 */
  .react-datepicker__day-name {
    font-weight: 700;
    color: #555;
  }

  .react-datepicker__day-name:hover {
    background-color: transparent !important;
  }

  /* 일반 날짜 */
  .react-datepicker__day {
    color: #333;
    border-radius: 50%;
    transition: all 0.2s;
  }

  .react-datepicker__day:hover {
    background-color: ${Lilac1} !important; /* hover 색상 */
    color: ${StudyLilac};
  }

  /* 선택된 날짜 */
  .react-datepicker__day--selected {
    background-color: ${StudyLilac};
    color: ${White};
    border-radius: 50%;
  }

  .react-datepicker__day--selected:hover {
    background-color: ${Lilac4} !important;
    color: ${White};
    border-radius: 50% !important;
  }

  /* 오늘 날짜 */
  .react-datepicker__day--today {
    background-color: ${Lilac0};
    color: ${StudyLilac};
    font-weight: bold;
    border-radius: 50%;
  }

  .react-datepicker__day--today:hover {
    background-color: ${Lilac3};
    color: ${White};
  }

  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: ${Lilac0} !important; /* 범위 배경색 */
    color: ${StudyLilac} !important;        /* 범위 글자색 */
  }

  .react-datepicker__day--in-range:hover {
    background-color: ${Lilac3} !important; /* hover시 색상 */
    color: ${White} !important;
  }

  /* 시작/종료일 */
  .react-datepicker__day--selecting-range-start,
  .react-datepicker__day--selecting-range-end {
    background-color: ${StudyLilac} !important; /* 범위 시작/끝 강조 */
    color: ${White} !important;
    border-radius: 50%;
  }

`;
