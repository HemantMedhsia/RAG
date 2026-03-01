import { useRef, useState } from "react";
import { createMessage } from "../utils/message.factory";
import type { Message } from "../types/types";
import { chatService } from "../services/services";

export function useChat({
  chatMode,
  selectedDocs,
  showToast,
}: {
  chatMode: string;
  selectedDocs: number[];
  showToast: any;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);
  const createdRef = useRef(false);

  const loadHistory = async (cid: number) => {
    try {
      const data = await chatService.getHistory(cid);

      const history = data.map((m: any) => ({
        id: m.id,
        role: m.role === "USER" ? "user" : "assistant",
        content: m.content,
        time: new Date(m.createdAt).toLocaleTimeString(),
      }));

      setMessages(history);
    } catch(err: any) {
      showToast({
        type: "error",
        title: "History failed",
        message: err.response?.data?.message || "Failed to load history",
      });
    }
  };

  const sendMessage = async (content: string) => {
    const currentRequest = ++requestIdRef.current;

    setMessages((p) => [...p, createMessage("user", content)]);
    setLoading(true);

    try {
      const data = await chatService.sendMessage({
        conversationId,
        question: content,
        scope: chatMode,
        documentIds: selectedDocs,
      });
      debugger;
      console.log("Received response:", data);

      if (currentRequest !== requestIdRef.current) return;

      if (!conversationId && data.conversationId && !createdRef.current) {
        createdRef.current = true;
        console.log("Setting conversation ID:", data);
        setConversationId(data.conversationId);
        window.dispatchEvent(new Event("conversation-created"));
      }

      setMessages((p) => [...p, createMessage("assistant", data.answer)]);
    } catch (e: any) {
      showToast({
        type: "error",
        title: "Chat failed",
        message: e.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setConversationId(null);
  };

  const regenerateLast = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;

    setMessages((p) => p.slice(0, -1));
    sendMessage(lastUser.content);
  };

  return {
    messages,
    loading,
    conversationId,
    loadHistory,
    sendMessage,
    resetChat,
    regenerateLast,
    setConversationId,
  };
}
