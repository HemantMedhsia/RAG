import type { ChatRole, Message } from "../types/types";

export const createMessage = (role: ChatRole, content: string): Message => ({
  id: Date.now(),
  role,
  content,
  time: new Date().toLocaleTimeString(),
});
