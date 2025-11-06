import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";

// 실제 API 대체용
const mockLogin = async (data) => {
  await new Promise((res) => setTimeout(res, 1000));
  if (data.email === "test@test.com" && data.password === "1234") {
    return {
      accessToken: "fake-jwt-token-123456",
      userProfile: { username: "테스트 유저", points: 1500 },
    };
  } else {
    throw new Error("이메일 또는 비밀번호가 잘못되었습니다.");
  }
};

// 추후 API 사용 예제

// const realLogin = async (data) => {
//   const res = await api.post("/auth/login", data);
//   return res.data; // { accessToken, user }
// };

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: mockLogin, // 추후 api.post("/auth/login", data)
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));

      dispatch(login(res.userProfile));

      navigate("/");
    },
    onError: (err) => {
      console.error("로그인 실패 :", err.message);
    },
  });
};
