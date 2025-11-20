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
    userProfile: { username: data.username, points: 0 },
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

const mockCheckUsername = async (username) => {
  await new Promise((res) => setTimeout(res, 500));
  console.log("이메일 중복 확인 요청:", username);

  if (username === "닉네임") {
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
  if (data.email === "test@test.com" && data.password === "1234qwer") {
    return {
      accessToken: "fake-jwt-token-123456",
      userProfile: { username: "테스트 유저", points: 1500 },
    };
  } else {
    throw new Error("이메일 또는 비밀번호가 잘못되었습니다.");
  }
};

// 추후 API 사용 예제

const realRegister = async (data) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

const checkEmail = async (email) => {
  const res = await api.post("/api/auth/check-email", { email });
  return res.data;
};

const checkUsername = async (username) => {
  const res = await api.post("/api/auth/check-username", { username });
  return res.data;
};

const realLogin = async (data) => {
  const res = await api.post("/api/auth/login", data);
  return res.data; // { accessToken, user }
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: realRegister,
    onSuccess: (res) => {
      navigate("/login");
    },
    onError: (err) => {
      console.error("회원가입 실패 :", err.message);
      return err;
    },
  });

  const checkEmailMutation = useMutation({
    mutationFn: checkEmail,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      alert(
        err.response?.data?.message || "이메일 확인 중 오류가 발생했습니다.",
      );
    },
  });

  const checkUsernameMutation = useMutation({
    mutationFn: checkUsername,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      alert(
        err.response?.data?.message || "닉네임 확인 중 오류가 발생했습니다.",
      );
    },
  });

  const loginMutation = useMutation({
    mutationFn: realLogin,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res?.data?.accessToken);
      localStorage.setItem("user", JSON.stringify(res?.data?.userProfile));

      dispatch(login(res?.data?.userProfile));

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
    checkUsernameMutation,
    registerMutation,
    loginMutation,
    handleLogout,
  };
};
