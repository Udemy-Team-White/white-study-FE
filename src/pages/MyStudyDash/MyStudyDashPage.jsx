import { useState } from "react";
import MyStudyHeader from "../../components/layout/MyStudyHeader";
import Todo from "./TodoComp/Todo";
import Dashboard from "./DashboardComp/Dashboard";
import Report from "./ReportComp/Report";
import Member from "./MemberComp/Member";
import Manage from "./ManageComp/Manage";
import { useParams } from "react-router-dom";
import ReportReg from "./ReportRegComp/ReportReg";
import { useGetDashboard } from "../../api/queries/useGetDashboard";

const MyStudyDashPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { studyId } = useParams();

  const { dashboardData } = useGetDashboard(studyId);

  const isLeader = dashboardData?.studyInfo?.myRole === "LEADER";

  return (
    <>
      <MyStudyHeader
        isLeader={isLeader}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 0 && (
        <Dashboard studyId={studyId} dashboardData={dashboardData} />
      )}
      {activeTab === 1 && <Todo studyId={studyId} />}
      {activeTab === 2 && (
        <Report studyId={studyId} setActiveTab={setActiveTab} />
      )}
      {activeTab === 4 && <Member studyId={studyId} isLeader={isLeader} />}
      {isLeader && activeTab === 5 && <Manage studyId={studyId} />}
      {activeTab === 6 && (
        <ReportReg studyId={studyId} setActiveTab={setActiveTab} />
      )}
    </>
  );
};

export default MyStudyDashPage;
