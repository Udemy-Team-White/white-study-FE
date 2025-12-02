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

export const patchMyInfo = (formData) => {
  return api.patch(`/api/users/me/username`, formData);
};

export const getMyStudies = (params) => {
  return api.get(`/api/users/me/studies`, { params });
};

// 스터디 활동 (멤버)
export const getDashboard = (studyId) => {
  return api.get(`/api/studies/${studyId}/dashboard`);
};

export const getTodoList = (studyId, date) => {
  return api.get(`/api/studies/${studyId}/todos`, { params: { date } });
};

export const postTodoItem = ({ listId, content }) => {
  return api.post(`/api/todo-lists/${listId}/items`, { content });
};

export const patchTodoStatus = (itemId, boolean) => {
  return api.patch(`/api/todo-items/${itemId}/status`, {
    isCompleted: boolean,
  });
};

export const patchTodoItem = (itemId, content) => {
  return api.patch(`/api/todo-items/${itemId}`, content);
};

export const deleteTodoItem = (itemId) => {
  return api.delete(`/api/todo-items/${itemId}`);
};

export const getReports = (studyId) => {
  return api.get(`/api/studies/${studyId}/reports`);
};

export const postCreateReport = ({ studyId, data }) => {
  return api.post(`/api/studies/${studyId}/reports`, data);
};

export const getReport = (reportId) => {
  return api.get(`/api/reports/${reportId}`);
};

export const postEditReport = (reportId, params) => {
  return api.post(`/api/reports/${reportId}`);
};

export const deleteReport = (reportId) => {
  return api.delete(`/api/reports/${reportId}`);
};

// 스터디 관리 (스터디장)
export const getApplicants = (studyId) => {
  return api.get(`/api/studies/${studyId}/applicants`);
};

export const postApplicantsApprove = ({ studyId, applicationId }) => {
  return api.post(
    `/api/studies/${studyId}/applicants/${applicationId}/approve`,
  );
};

export const getMemberList = ({ studyId }) => {
  return api.get(`/api/studies/${studyId}/members`);
};

export const postApplicantsReject = ({ studyId, applicationId }) => {
  return api.post(`/api/studies/${studyId}/applicants/${applicationId}/reject`);
};

export const deleteMember = ({ studyId, memberId }) => {
  return api.delete(`/api/studies/${studyId}/members/${memberId}`);
};

export const postStudyId = ({ studyId, payload }) => {
  return api.post(`/api/studies/${studyId}`, payload);
};
