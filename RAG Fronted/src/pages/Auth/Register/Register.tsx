import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { useState } from "react";
import AiPegtopLoader from "../../../components/ui/AiPegtopLoader";
import BgParticles from "../../../components/ui/BgParticles";
import StoryContent from "./components/StoryContent";
import RegisterCard from "./components/RegisterCard";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };


  return (
    <div className="relative min-h-screen overflow-hidden bg-indigo-400/40 text-gray-200">
      <div className="absolute inset-0 bg-[#0B0F1A] clip-diagonal-register z-0" />
      <div className="absolute inset-0 premium-noise z-1 pointer-events-none" />
      <BgParticles particlesInit={particlesInit} />
      <StoryContent />
      <RegisterCard setLoading={setLoading} />
      <AiPegtopLoader visible={loading} text="Signing you up…" />
    </div>
  );
}
