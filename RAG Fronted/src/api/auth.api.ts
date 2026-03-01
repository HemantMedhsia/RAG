import api from "./api";

export const fetchMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const logoutApi = async () => {
  await api.post("/auth/logout");
}; 