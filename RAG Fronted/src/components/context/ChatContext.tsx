import { createContext, useContext, useState } from "react";

export type ChatMode = "GLOBAL" | "DOCUMENT" | "MULTI_DOCUMENT";

type ChatContextType = {
    chatMode: ChatMode;
    setChatMode: React.Dispatch<React.SetStateAction<ChatMode>>;
    selectedDocs: number[];
    setSelectedDocs: React.Dispatch<React.SetStateAction<number[]>>;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [chatMode, setChatMode] = useState<ChatMode>("GLOBAL");
    const [selectedDocs, setSelectedDocs] = useState<number[]>([]);

    return (
        <ChatContext.Provider
            value={{
                chatMode,
                setChatMode,
                selectedDocs,
                setSelectedDocs,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const ctx = useContext(ChatContext);
    if (!ctx) {
        throw new Error("useChatContext must be used inside ChatProvider");
    }
    return ctx;
}