import styled from "styled-components";
import { Lilac0, StudyLilac, White } from "../../../styles/colors";
import {
  Body,
  Heading3Bold,
  Heading4Bold,
  Heading5,
  Heading5Bold,
} from "../../../styles/fonts";
import { TagStyle } from "../../../components/common/button";
import { PiListBullets, PiListChecks } from "react-icons/pi";
import { formatDate } from "../../../utils/formatDate";
import { PercentageComp } from "../../../components/common/PercentageComp";
import { useGetTodoList } from "../../../api/queries/useGetTodoList";
import { useState } from "react";
import TodoBox from "../TodoComp/component/TodoBox";

// const dashboardData = {
//   studyInfo: {
//     studyId: 1,
//     title: "string (스터디 제목)",
//     status: "string (예: 'IN_PROGRESS')",
//   },
//   //"nextSchedule": {
//   // "dayOfWeek": "string (예: 'MONDAY', 'WEDNESDAY')",
//   // "time": "string (예: '20:00')"

//   nextScheduleDateTime: "string (DATETIME, 'YYYY-MM-DDTHH:mm:ss')",
//   // },
//   myTodayProgress: {
//     totalItems: 14,
//     completedItems: 10,
//     progressPercentage: "integer (0 ~ 100)",
//   },
//   recentReports: [
//     {
//       reportId: "integer",
//       authorUsername: "string (작성자 닉네임)",
//       createdAt: "string (DATETIME, 작성일)",
//     },
//   ],
//   members: [
//     {
//       userId: "integer",
//       username: "string (멤버 닉네임)",
//       role: "string ('LEADER', 'MEMBER')",
//     },
//   ],
// };

const Container = styled.div`
  background-color: ${Lilac0};
  max-width: 1080px;
  margin: auto;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const StudyTitle = styled.div`
  ${Heading4Bold}
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.$marginTop || 0};
`;

const StudyTag = styled.span`
  ${TagStyle}
  background-color: ${StudyLilac};
  color: ${White};
  margin-left: 8px;
`;

const StudyDate = styled.div`
  margin-top: 8px;
  ${Heading5}
`;

const BodyText = styled.span`
  ${Body}
`;

const ScheduleBox = styled.div`
  background-color: ${White};
  border-radius: 16px;
  margin-top: 40px;
`;

const ScheduleTopBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ScheduleLabel = styled.div`
  background-color: ${StudyLilac};
  border-radius: 16px 0 20px 0;
  ${Heading5Bold}
  color: ${White};
  padding: 10px 24px;
`;

const ScheduleText = styled.div`
  ${Heading5}
  margin: 20px 40px 40px 40px;
`;

const TodoSummaryBox = styled.div`
  display: grid;
  margin-top: 48px;
  margin-bottom: 24px;
  gap: 24px;

  @media (min-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TodoSummary = styled.div`
  background-color: ${StudyLilac};
  width: 100%;
  height: 100px;
  border-radius: 12px;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 12px 20px 8px 20px;
  box-sizing: border-box;
`;

const IconBox = styled.div`
  border: 3px solid ${White};
  border-radius: 12px;
  display: flex;
  width: 60px;
  height: 60px;
`;

const TodoSummaryLabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;

const TodoSummaryLabel = styled.div`
  ${Heading5Bold}
  color: ${White};
`;

const TodoSummaryCount = styled.div`
  ${Heading3Bold}
  color: ${White};
  display: flex;
  flex-direction: row-reverse;
`;

const TodoListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 40px;
`;

const Dashboard = ({ studyId, dashboardData }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { todoList } = useGetTodoList({ studyId, date });

  return (
    <Container>
      <StudyTitle>
        {dashboardData?.studyInfo?.studyName || "정해진 스터디 명이 없습니다."}
        <StudyTag>{dashboardData?.studyInfo?.status}</StudyTag>
      </StudyTitle>
      <StudyDate>
        {dashboardData?.studyInfo?.startDate &&
        dashboardData?.studyInfo?.endDate
          ? formatDate(dashboardData?.studyInfo?.startDate) +
            " ~ " +
            formatDate(dashboardData?.studyInfo?.endDate)
          : "스터디 기간이 정해지지 않았습니다."}
      </StudyDate>

      <ScheduleBox>
        <ScheduleTopBox>
          <ScheduleLabel>다음 일정</ScheduleLabel>
        </ScheduleTopBox>
        <ScheduleText>
          {dashboardData?.nextScheduleDateTime || "정해진 일정이 없습니다."}
        </ScheduleText>
      </ScheduleBox>

      <TodoSummaryBox>
        <TodoSummary>
          <IconBox>
            <PiListBullets size={60} color={White} />
          </IconBox>
          <TodoSummaryLabelBox>
            <TodoSummaryLabel>전체 TODO</TodoSummaryLabel>
            <TodoSummaryCount>
              {dashboardData?.myTodayProgress?.totalItems} 개
            </TodoSummaryCount>
          </TodoSummaryLabelBox>
        </TodoSummary>

        <TodoSummary>
          <IconBox>
            <PiListChecks size={60} color={White} />
          </IconBox>
          <TodoSummaryLabelBox>
            <TodoSummaryLabel>완료한 TODO</TodoSummaryLabel>
            <TodoSummaryCount>
              {dashboardData?.myTodayProgress?.completedItems} 개
            </TodoSummaryCount>
          </TodoSummaryLabelBox>
        </TodoSummary>
      </TodoSummaryBox>

      <PercentageComp
        title={`나의
진행률`}
        number={dashboardData?.myTodayProgress?.progressPercentage}
        unit="%"
      />

      <TodoListBox>
        <StudyTitle $marginTop="52px">미완료 TODO</StudyTitle>
        {todoList?.items
          ?.filter((item) => !item.isCompleted)
          ?.map((item) => (
            <TodoBox
              key={item.todoItemId}
              item={item}
              listId={item?.todoItemId}
            />
          ))}
      </TodoListBox>
    </Container>
  );
};

export default Dashboard;
