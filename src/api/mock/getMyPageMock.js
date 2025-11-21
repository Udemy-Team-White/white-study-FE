export const getMyPageMock = async () => {
  await new Promise((res) => setTimeout(res, 500));

  return mockMyPageData;
};

//
// 가짜 데이터
const mockMyPageData = {
  data: {
    data: {
      profileInfo: {
        username: "string (내 닉네임)",
        email: "string (내 이메일)",
        bio: "사용자의 자기소개란입니다. 자기소개글을 긁어와 작성됩니다. 두줄이 작성되어야 해요. 어떻게 배치가 되는지 확인을 위해서",
        imgUlr:
          "https://cdn.pixabay.com/photo/2025/06/19/16/21/adventure-9669323_640.jpg",
      },
      activitySummary: {
        points: "integer (현재 보유 포인트)",
        reliabilityScore: 75,
        praise: [
          { message: "정리를 잘 해요", count: 17 },
          { message: "성실해요", count: 23 },
          { message: "다른 사람들은 잘 도와줘요", count: 13 },
          { message: "전공 지식이 풍부해요", count: 7 },
        ],
        inProgressStudies: "integer (현재 참여중인 스터디 수)",
        completedStudies: "integer (완료한 스터디 수)",
      },
      inventorySummary: [
        {
          itemId: "integer (보유 아이템 ID)",
          itemName: "string (아이템 이름, 예: '프로필 배경 A')",
          equipped: "boolean (현재 사용(장착) 중인지 여부)",
        },
      ],
    },
  },
};
