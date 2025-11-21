import api from "./api";

//온보딩 & 공통
export const getStudies = (params) => {
  return api.get(`/api/studies`, { params });
};

//스터디 탐색 & 개설 요청
export const postStudies = (data) => {
  return api.post(`/api/studies`, data);
};

export const getStudyId = (studyId) => {
  return api.get(`/api/studies/${studyId}`);
};

export const getCategories = () => {
  return api.get(`/api/categories`);
};

export const postApplyStudy = ({ studyId, message }) => {
  return api.post(`/api/studies/${studyId}/apply`, message);
};

// 마이페이지 & 개인 설정
export const getMyPage = () => {
  return api.get(`/api/users/me/mypage-data`);
};

export const getMyStudies = (params) => {
  return api.get(`/api/users/me/studies`, { params });
};
