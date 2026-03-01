import { useCallback, useEffect, useState } from "react";
import {
  LayoutDashboard,
  Upload,
  Globe,
  FileText,
  Layers,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../context/ChatContext";
import { useAiToast } from "../context/AiToastContext";
import DocSelectModal from "../ui/DocSelectModal";
import { createPortal } from "react-dom";
import { AllChatsModal } from "./components/AllChatsModal";
import { ChatItem } from "./components/ChatItem";
import { Section } from "./components/Section";
import { ModeButton } from "./components/ModeButton";
import { NavItem } from "./components/NavItem";
import Button from "../ui/Button";
import api from "../../api/api";
import { useAuth } from "../context/AuthContext";

type Document = {
  id: number;
  fileName: string;
};

export default function Sidebar({
  open
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { chatMode, setChatMode, selectedDocs, setSelectedDocs } = useChatContext();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [allChatsOpen, setAllChatsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const showToast = useAiToast();

  useEffect(() => {
    api
      .get("documents/get-all-docs")
      .then((res) => setDocuments(res.data.data))
      .catch(() => {
        showToast({
          type: "error",
          title: "Failed",
          message: "Could not load documents",
        });
      });
  }, []);

  const fetchChatHistory = useCallback(() => {
    api
      .get("chat/conversations")
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setChatHistory(sorted);
      })
      .catch(() => {
        showToast({
          type: "error",
          title: "Failed",
          message: "Could not load chat history",
        });
      });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchChatHistory();
    window.addEventListener("conversation-created", fetchChatHistory);
    return () => window.removeEventListener("conversation-created", fetchChatHistory);

  }, [fetchChatHistory, fetchChatHistory]);

  const latestChats = chatHistory.slice(0, 4);

  function getSmartName(fileName: string) {
    const clean = fileName.replace(/\.(pdf|docx|txt)$/i, "");
    const words = clean.split(/[\s_]+/);

    if (words.length === 1) return words[0];

    if (words[0].length >= 8) {
      return words[0].slice(0, 8).substring(0, 12) + "...";
    } else {
      let combined = words[0] + " " + (words[1].length > 4 ? words[1].slice(0, 4) + "..." : words[1]);
      return combined;
    }
  }


  return (
    <aside className={`fixed md:static top-0 left-0 h-screen w-72 z-40 border-r border-white/10 bg-[#0E1320]/90 backdrop-blur-xl
       p-4 text-gray-300 transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="mb-6 text-xl font-semibold tracking-tight text-gray-100">
        RAG<span className="text-indigo-500">Lux</span>
      </div>

      <nav className="space-y-1">
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          onClick={() => navigate("/")}
        />
        <NavItem
          icon={Upload}
          label="Upload Documents"
          onClick={() => navigate("/upload")}
        />
      </nav>

      <Section title="Chat Mode">
        <ModeButton
          icon={Globe}
          label="Global Knowledge"
          active={chatMode === "GLOBAL"}
          onClick={() => {
            setChatMode("GLOBAL");
            setSelectedDocs([]);
            navigate("/chat");
          }}
        />

        <ModeButton
          icon={FileText}
          label="Single Document"
          active={chatMode === "DOCUMENT"}
          onClick={() => {
            setChatMode("DOCUMENT");
            setSelectedDocs([]);
            navigate("/chat");
          }}
        />

        <ModeButton
          icon={Layers}
          label="Multiple Documents"
          active={chatMode === "MULTI_DOCUMENT"}
          onClick={() => {
            setChatMode("MULTI_DOCUMENT");
            setSelectedDocs([]);
            navigate("/chat");
          }}
        />
      </Section>

      {chatMode !== "GLOBAL" && (
        <Section title="Document Context">
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 items-center mx-8 my-2">
            {selectedDocs.map((id, index) => {
              const doc = documents.find((d) => d.id === id);
              if (!doc) return null;
              const row = Math.floor(index / 2);
              const zigzag = row % 2 !== 0;

              return (
                <span
                  key={id}
                  title={doc.fileName}
                  className={` truncate rounded-full bg-indigo-900 px-3 max-w-24 py-1.5 text-xs text-indigo-300 inline-flex
                    items-center justify-center transition hover:bg-indigo-500/30 overflow-x-hidden ${zigzag ? "-translate-x-3" : "translate-x-3"}`}
                >
                  {getSmartName(doc.fileName)}
                </span>
              );
            })}
          </div>

          {selectedDocs.length === 0 && (
            <p className="mt-2 text-xs text-gray-500">
              Select {chatMode === "DOCUMENT" ? "one" : "multiple"} document(s)
            </p>
          )}

          <button
            onClick={() => setDocModalOpen(true)}
            className="mt-2 text-xs text-indigo-400 hover:underline"
          >
            Select documents
          </button>
        </Section>
      )}


      <Section title="Recent Chats">
        <div className="space-y-1">
          {latestChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              active={chat.id === activeConversationId}
            />
          ))}
        </div>
      </Section>
      <Button
        size="sm"
        variant="primary"
        onClick={() => setAllChatsOpen(true)}
        className="flex items-center justify-center gap-2 mt-4 w-full"
        aria-label="View all chats"
      >
        <MessageCircle size={14} />
        <span className="hidden sm:inline">View all chats</span>
      </Button>

      {docModalOpen &&
        createPortal(
          <DocSelectModal
            documents={documents}
            onClose={() => setDocModalOpen(false)}
          />,
          document.body
        )}

      {allChatsOpen && (
        <AllChatsModal
          chats={chatHistory}
          activeId={activeConversationId}
          onClose={() => setAllChatsOpen(false)}
        />
      )}

    </aside>
  );
}