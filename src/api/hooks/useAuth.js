import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { login } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";

// 실제 API 대체용
const mockRegister = async (data) => {
  await new Promise((res) => setTimeout(res, 500));
  console.log("회원가입 요청 데이터:", data);

  if (data.email === "test@test.com") {
    const error = new Error("이미 존재하는 이메일입니다.");
    error.code = 201;
    error.response = {
      data: {
        code: 201,
        message: "이미 존재하는 이메일입니다.",
      },
    };
    throw error;
  }

  return {
    message: "회원가입이 완료되었습니다.",
    userProfile: { username: data.nickname, points: 0 },
  };
};

const mockCheckEmail = async (email) => {
  await new Promise((res) => setTimeout(res, 500));
  console.log("이메일 중복 확인 요청:", email);

  if (email === "test@test.com") {
    const error = new Error("이미 존재하는 이메일입니다.");
    error.code = 409;
    error.response = {
      data: { code: 409, message: "이미 존재하는 이메일입니다." },
    };
    throw error;
  }
  return {
    code: 200,
    message: "사용 가능한 이메일입니다.",
  };
};

const mockCheckNickname = async (nickname) => {
  await new Promise((res) => setTimeout(res, 500));
  console.log("이메일 중복 확인 요청:", nickname);

  if (nickname === "닉네임") {
    const error = new Error("이미 존재하는 닉네임입니다.");
    error.code = 409;
    error.response = {
      data: { code: 409, message: "이미 존재하는 닉네임입니다." },
    };
    throw error;
  }
  return {
    code: 200,
    message: "사용 가능한 닉네임입니다.",
  };
};

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

// const realRegister = async (data) => {
//   const res = await api.post("/auth/register", data);
//   return res.data;
// }

// const checkEmail = async (email) => {
//   const res = await api.post("/auth/check-email", {email});
//   return res.data;
// }

// const checkNickname = async (nickname) => {
//   const res = await api.post("/auth/check-nickname", {nickname});
//   return res.data;
// }

// const realLogin = async (data) => {
//   const res = await api.post("/auth/login", data);
//   return res.data; // { accessToken, user }
// };

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: mockRegister,
    onSuccess: (res) => {
      navigate("/login");
    },
    onError: (err) => {
      console.error("회원가입 실패 :", err.message);
      return err;
    },
  });

  const checkEmailMutation = useMutation({
    mutationFn: mockCheckEmail,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      alert(
        err.response?.data?.message || "이메일 확인 중 오류가 발생했습니다.",
      );
    },
  });

  const checkNicknameMutation = useMutation({
    mutationFn: mockCheckNickname,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      alert(
        err.response?.data?.message || "이메일 확인 중 오류가 발생했습니다.",
      );
    },
  });

  const loginMutation = useMutation({
    mutationFn: mockLogin,
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    dispatch(logout());

    navigate("/");
  };

  return {
    checkEmailMutation,
    checkNicknameMutation,
    registerMutation,
    loginMutation,
    handleLogout,
  };
};
