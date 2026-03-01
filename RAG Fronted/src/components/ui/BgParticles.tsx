import Particles from "react-tsparticles"

function BgParticles({ particlesInit }: { particlesInit: (engine: any) => Promise<void> }) {
    return (
        <Particles
            init={particlesInit}
            options={{
                background: { color: "transparent" },
                particles: {
                    number: { value: 70 },
                    color: { value: "#2CFF05" },
                    opacity: { value: 0.25 },
                    size: { value: 3 },
                    move: { enable: true, speed: 1 },
                    links: {
                        enable: true,
                        distance: 140,
                        color: "#2CFF05",
                        opacity: 0.35,
                    },
                },
            }}
            className="absolute inset-0 z-1"
        />
    )
}

export default BgParticles