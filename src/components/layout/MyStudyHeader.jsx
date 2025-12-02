import styled from "styled-components";
import {
  Black,
  Lilac0,
  Lilac2,
  Lilac3,
  StudyLilac,
  White,
} from "../../styles/colors";
import { Link, useParams } from "react-router-dom";
import { Body, BodyBold } from "../../styles/fonts";
import { useMediaQuery } from "react-responsive";

import {
  IoHome,
  IoCheckbox,
  IoCalendarClear,
  IoNewspaper,
} from "react-icons/io5";
import { FaCog } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

const TabMenu = styled.div`
  display: flex;
  overflow: hidden;
  max-width: 1080px;
  margin: auto;
`;

const Tab = styled.button`
  width: 100%;
  height: 56px;
  background-color: ${(props) => (props.active ? `${Lilac0}` : `${Lilac2}`)};
  color: ${(props) => (props.active ? `${StudyLilac}` : `${Lilac3}`)};
  border: none;
  cursor: pointer;
  ${(props) => (props.active ? `${BodyBold}` : `${Body}`)};
  border-radius: 16px 16px 0 0;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background-color: ${Lilac3};
    color: ${White};
  }
  @media (min-width: 767px) {
    color: ${(props) => (props.active ? `${StudyLilac}` : `${Black}`)};
  }
`;

const LinkBox = styled(Link)`
  color: unset;
  flex: 1;
`;

const MyStudyHeader = ({ isLeader, activeTab, setActiveTab }) => {
  const { studyId } = useParams();

  const isDesktop = useMediaQuery({ minWidth: 767 });

  const tabs = [
    {
      id: 0,
      name: "홈",
      icon: <IoHome size={24} />,
      link: `/my/study/${studyId}`,
    },
    {
      id: 1,
      name: "TODO",
      icon: <IoCheckbox size={24} />,
      link: `/my/study/${studyId}/todo`,
    },
    {
      id: 2,
      name: "보고서",
      icon: <IoNewspaper size={24} />,
      link: `/my/study/${studyId}/report`,
    },
    // { id: 3, name: "일정", icon: <IoCalendarClear size={24} />, link: `` },
    {
      id: 4,
      name: "멤버",
      icon: <IoMdPerson size={24} />,
      link: `/my/study/${studyId}/member`,
    },
    ...(isLeader
      ? [
          {
            id: 5,
            name: "관리",
            icon: <FaCog size={24} />,
            link: `/my/study/${studyId}/manage`,
          },
        ]
      : []),
  ];

  return (
    <>
      <TabMenu>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={tab.id === activeTab}
            onClick={() => setActiveTab(tab.id)}
          >
            {isDesktop ? tab.name : tab.icon}
          </Tab>
        ))}
      </TabMenu>
    </>
  );
};

export default MyStudyHeader;
