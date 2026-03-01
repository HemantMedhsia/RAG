import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Button from "../../../../components/ui/Button"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../../../../api/api"

function RegisterCard({ setLoading }: { setLoading: (loading: boolean) => void }) {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            setLoading(true)
            setError("")

            await api.post("/auth/register",
                {
                    name,
                    email,
                    password,
                }
            )
            navigate("/")

        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.details)
            } else {
                setError("Registration failed. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute right-1/2 top-1/2 z-20 w-full max-w-md -translate-y-1/2"
        >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_40px_100px_-40px_rgba(99,102,241,0.45)]">
                <div className="absolute inset-0 bg-[#0B0F1A]" />
                <div className="relative backdrop-blur-xl border border-white/10">
                    <div className="relative z-10 p-8">
                        <div className="mb-6 text-center">
                            <Sparkles className="mx-auto mb-3 text-indigo-400" />
                            <h2 className="text-2xl font-semibold">
                                Create your workspace
                            </h2>
                            <p className="mt-1 text-sm text-gray-400">
                                Start building your private AI.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full name"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-indigo-500/40"
                            />

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-indigo-500/40"
                            />

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-indigo-500/40"
                            />

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-indigo-500/40"
                            />

                            {error && (
                                <p className="text-xs text-red-400">{error}</p>
                            )}

                            <Button className="w-full" onClick={handleRegister}>
                                Create account
                            </Button>
                        </div>

                        <div className="my-6 flex items-center gap-3 text-xs text-gray-500">
                            <div className="h-px flex-1 bg-white/10" />
                            OR
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <button
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm hover:bg-white/10"
                            onClick={() => console.log("Google Register")}
                        >
                            <FcGoogle size={18} />
                            Sign up with Google
                        </button>

                        <p className="mt-6 text-center text-xs text-gray-500">
                            Already have an account?{" "}
                            <span
                                className="cursor-pointer text-indigo-400 hover:underline"
                                onClick={() => navigate("/login")}
                            >
                                Sign in
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default RegisterCard