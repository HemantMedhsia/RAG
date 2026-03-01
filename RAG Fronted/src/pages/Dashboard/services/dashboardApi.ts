import api from "../../../api/api";

export const fetchDashboard = async () => {
  const res = await api.get("dashboard");
  return res.data;
};