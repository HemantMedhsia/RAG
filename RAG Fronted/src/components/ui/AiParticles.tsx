import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";

export default function AiParticles() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={init}
      className="absolute inset-0 z-0"
      options={{
        background: {
          color: "transparent",
        },
        fpsLimit: 60,

        particles: {
          number: {
            value: 36,
            density: {
              enable: true,
              area: 900,
            },
          },

          color: {
            value: "#2CFF05",
          },

          opacity: {
            value: 0.4,
          },

          size: {
            value: { min: 1, max: 5 },
          },

          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: true,
            straight: false,
            outModes: "out",
          },

          links: {
            enable: true,
            color: "#2CFF05",
            opacity: 0.12,
            distance: 160,
          },
        },

        detectRetina: true,
      }}
    />
  );
}