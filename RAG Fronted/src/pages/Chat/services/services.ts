import api from "../../../api/api";

export const chatService = {
  async getHistory(conversationId: number) {
    const res = await api.get(`chat/history/${conversationId}`);
    return res.data;
  },

  async sendMessage(payload: {
    conversationId: number | null;
    question: string;
    scope: string;
    documentIds: number[];
  }) {
    const res = await api.post("/chat", payload);
    return res.data.data;
  },
};