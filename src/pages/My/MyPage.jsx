import styled from "styled-components";
import BottomMenuComp from "./components/BottomMenuComp";
import ShortcutComp from "./components/ShortcutComp";
import ScoreComp from "./components/ScoreComp";
import ProfileComp from "./components/ProfileComp";
import { useGetMyPage } from "../../api/queries/useGetMyPage";

const MyPageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;
  max-width: 1080px;
  margin: 0 auto;
  margin-top: 100px;
`;

const MyPage = () => {
  const { MyPageData } = useGetMyPage();

  return (
    <MyPageBox>
      <ProfileComp data={MyPageData?.profileInfo} />

      <ScoreComp data={MyPageData?.activitySummary} />

      <ShortcutComp />

      <BottomMenuComp />
    </MyPageBox>
  );
};

export default MyPage;
