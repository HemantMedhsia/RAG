import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <Bot size={16} />
      <span className="flex gap-1">
        <span className="animate-bounce">•</span>
        <span className="animate-bounce delay-100">•</span>
        <span className="animate-bounce delay-200">•</span>
      </span>
    </div>
  );
}