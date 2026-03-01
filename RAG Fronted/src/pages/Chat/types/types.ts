type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
};

type ChatRole = "user" | "assistant";

export { type Message, type ChatRole };
