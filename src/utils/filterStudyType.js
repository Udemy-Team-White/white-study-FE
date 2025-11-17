export const filterStudyType = (type) => {
  if (type === "OFFLINE") return "오프라인";
  if (type === "ONLINE") return "온라인";
  if (type === "MIXED") return "온·오프라인";
  return "온라인";
};
