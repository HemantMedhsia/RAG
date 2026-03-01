import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import StoryContent from "./components/StoryContent";
import LoginCard from "./components/LoginCard";
import BgParticles from "../../../components/ui/BgParticles";
import AiPegtopLoader from "../../../components/ui/AiPegtopLoader";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-indigo-400/50 text-gray-200">
      <div className="absolute inset-0 bg-[#0B0F1A] clip-diagonal z-0" />
      <BgParticles particlesInit={particlesInit} />
      <StoryContent />
      <LoginCard setLoading={setLoading} />
      <AiPegtopLoader visible={loading} text="Signing you in…" />
    </div>
  );
}