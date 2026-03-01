import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useChat } from "./hooks/useChat";
import ChatHeader from "./components/ChatHeader";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import { useChatContext } from "../../components/context/ChatContext";
import { useAiToast } from "../../components/context/AiToastContext";

export default function Chat() {

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [searchParams] = useSearchParams();
  const { chatMode, selectedDocs } = useChatContext();
  const showToast = useAiToast();
  const chat = useChat({ chatMode, selectedDocs, showToast });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, chat.loading]);

  useEffect(() => {
    const cid = searchParams.get("conversationId");
    if (!cid) {
      chat.resetChat();
      return;
    }

    const id = Number(cid);
    chat.setConversationId(id);
    chat.loadHistory(id);

  }, [searchParams]);

  const handleSend = () => {
    if (!input.trim() || chat.loading) return;
    chat.sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <ChatHeader messages={chat.messages} regenerateLast={chat.regenerateLast} handleNewChat={chat.resetChat} />
      <ChatBody messages={chat.messages} loading={chat.loading} bottomRef={bottomRef} />
      <ChatInput input={input} setInput={setInput} handleSend={handleSend} loading={chat.loading} />
    </div>
  );
}