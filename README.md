# 흰둥이 스터디

스터디 모집부터 운영·마무리까지 한 플랫폼에서 처리할 수 있는 웹 서비스입니다.  
스터디 모집 플랫폼은 많지만 **모집 이후를 관리할 수 있는 도구가 없다**는 공백에서 출발했습니다.

🔗 **배포 URL:** [https://white-study-fe.vercel.app](https://white-study-fe.vercel.app) _(AWS 프리티어 종료로 현재 서버 미운영, 시연 영상으로 대체)_  
🎬 **시연 영상:** [Google Drive](https://drive.google.com/file/d/1gAuttGi7Kacxdv_m-sDBVS0urMhvmB4P/view?usp=sharing)  
💻 **코드:** [GitHub](https://github.com/Udemy-Team-White/white-study-FE)

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 개발 기간 | 2025. 10. 13 ~ 2025. 12. 11 |
| 개발 인원 | 2인 (기획 완료 후 1인 이탈) |
| 담당 업무 | 기획, 디자인, FE 개발 |

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 언어 / 프레임워크 | JavaScript, React 19 |
| 스타일링 | Styled Components |
| 전역 상태 | Redux / Redux Toolkit |
| 서버 상태 | Axios, Tanstack Query |
| 폼 관리 | React Hook Form |
| 에디터 / UI | Tiptap, embla-carousel-react, react-datepicker |
| 라우팅 / 반응형 | React Router, React Responsive |
| 빌드 / 배포 | Vite, Vercel |
| 코드 컨벤션 | Prettier |

---

## 주요 구현 내용

### 1. 반응형 웹 (모바일 퍼스트)

스터디 모집·참여가 모바일에서 주로 이루어진다고 판단해 모바일 퍼스트로 설계했습니다.  
1080px 기준 8컬럼 그리드 시스템을 도입하고, CSS Flex 비율로 연결해 일관된 레이아웃을 구현했습니다.

- 브레이크포인트: `767px` / `1080px`
- 그리드: 데스크톱 8컬럼, 모바일 4컬럼, gap `24px`
- React Responsive로 브레이크포인트별 컴포넌트 조건부 렌더링

### 2. Axios 인스턴스 공통화

2인 협업에서 API 호출 방식을 일관되게 유지하기 위해 Axios 인스턴스를 단일로 설계했습니다.  
JWT 토큰은 인터셉터에서 자동으로 헤더에 첨부됩니다.

```js
// src/api/api.js
const api = axios.create({
  baseURL: 'https://api-white-study-be.store/',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### 3. Tanstack Query로 서버 상태 관리

해외 서버 사용으로 데이터 요청 시 3~5초 지연이 발생했습니다.  
Tanstack Query로 로딩 상태를 관리해 빈 화면 노출을 최소화하고, 근본적인 해결을 위해 서버를 한국으로 마이그레이션했습니다.  
각 기능별로 커스텀 쿼리 훅을 분리해 컴포넌트에서의 관심사를 분리했습니다.

```js
// src/api/queries/useGetDashboard.js
export const useGetDashboard = (studyId) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getDashboard(studyId),
    queryKey: ['GETDASHBOARD', studyId],
  });
  return { dashboardData: data?.data?.data, ...rest };
};
```

### 4. 스터디 대시보드 (모집 이후 운영 관리)

스터디에 참여하면 역할(`LEADER` / `MEMBER`)에 따라 접근할 수 있는 탭이 달라집니다.

| 탭 | 기능 | 권한 |
|----|------|------|
| 대시보드 | 스터디 정보, 다음 일정, 오늘의 할 일 진행률 | 전체 |
| 투두 | 날짜별 할 일 추가·수정·삭제·완료 처리 | 전체 |
| 보고서 | Tiptap 에디터로 활동 보고서 작성·조회 | 전체 |
| 멤버 | 멤버 목록 조회 | 전체 |
| 관리 | 참가 신청 승인/거절, 멤버 강퇴 | 리더 전용 |

### 5. 라이브러리 선택 기준 (제한된 인원에서의 기술 선택)

1인 이탈 후 일정 내 완성을 위해 직접 구현 대신 라이브러리를 적극 활용했습니다.  
각 라이브러리는 여러 후보와 비교 후 선택했습니다.

- **Tiptap**: 스터디 활동 보고서 작성에 서식 있는 글 작성 지원
- **embla-carousel-react**: 여러 캐러셀 라이브러리 비교 후 커스텀 자유도가 높아 선택
- **React Hook Form**: 불필요한 리렌더링 방지 + 유효성 검사를 선언적으로 처리

---

## 트러블슈팅

### BE API 데이터 오류 (study_id 고정 이슈)

**문제**: API 연동 중 Network 탭에서 누락·잘못된 데이터가 반복 확인됨. `study_id`가 항상 `1`로 고정되어 모든 상세 페이지가 동일한 스터디를 조회하는 문제 발생

**해결**: FE에서 문제를 먼저 인지하고 BE 코드를 직접 분석해 원인을 파악한 뒤 수정을 요청

---

## 프로젝트 구조

```
src/
├── api/
│   ├── api.js              # Axios 인스턴스 (JWT 인터셉터)
│   ├── Services.js         # API 엔드포인트 함수
│   ├── hooks/
│   │   └── useAuth.js      # 로그인·회원가입·로그아웃
│   └── queries/            # Tanstack Query 커스텀 훅 (기능별 분리)
├── components/
│   ├── common/             # Button, Input, Modal, Pagination 등
│   └── layout/             # Header, Footer, MyStudyHeader
├── pages/
│   ├── Home/               # 스터디 탐색, 검색, 캐러셀
│   ├── Study/              # 스터디 상세
│   ├── StudyReg/           # 스터디 개설
│   ├── StudyEdit/          # 스터디 수정
│   ├── MyStudies/          # 나의 스터디 목록
│   ├── MyStudyDash/        # 스터디 대시보드 (투두·보고서·멤버·관리)
│   ├── My/                 # 마이페이지
│   ├── Store/              # 포인트 상점
│   └── StudyDone/          # 완료된 스터디
├── store/                  # Redux 슬라이스 (user, modal, ui)
├── styles/
│   ├── colors.js           # 디자인 토큰 (Lilac, Gray, Red, Yellow, Green)
│   └── fonts.js            # 타입 스케일
└── utils/                  # formatDate, filterStudyType 등
```

---

## 실행 방법

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build
```

> ⚠️ AWS 프리티어 종료로 현재 백엔드 서버가 미운영 상태입니다.  
> 실제 동작은 [시연 영상](https://drive.google.com/file/d/1gAuttGi7Kacxdv_m-sDBVS0urMhvmB4P/view?usp=sharing)으로 확인해주세요.
