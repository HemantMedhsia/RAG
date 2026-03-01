import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Button from "../../../../components/ui/Button"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../../../../api/api"
import { fetchMe } from "../../../../api/auth.api"
import { useAuth } from "../../../../components/context/AuthContext"

function LoginCard({ setLoading }: { setLoading: (loading: boolean) => void }) {
    const navigate = useNavigate()
    const { setAuthUser } = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Email and password are required")
            return
        }

        try {
            setLoading(true)
            setError("")

            await api.post("auth/login", { email, password })
            const me = await fetchMe();
            setAuthUser(me);
            navigate("/", {replace: true})

        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message)
            } else {
                setError("Something went wrong. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-y-1/2"
        >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(99,102,241,0.45)]">
                <div className="absolute inset-0 bg-[#0B0F1A]" />
                <div className="relative backdrop-blur-xl border border-white/10">
                    <div className="relative z-10 p-8">
                        <div className="mb-6 text-center">
                            <Sparkles className="mx-auto mb-3 text-indigo-400" />
                            <h2 className="text-2xl font-semibold">Welcome back</h2>
                            <p className="mt-1 text-sm text-gray-400">
                                Enter your knowledge workspace
                            </p>
                        </div>

                        <div className="space-y-4">
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

                            {error && (
                                <p className="text-xs text-red-400">{error}</p>
                            )}

                            <Button
                                className="w-full"
                                onClick={handleLogin}
                                disabled={false}
                            >
                                Sign In
                            </Button>
                        </div>

                        <div className="my-6 flex items-center gap-3 text-xs text-gray-500">
                            <div className="h-px flex-1 bg-white/10" />
                            OR
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <button
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm hover:bg-white/10"
                            onClick={() => console.log("Google OAuth")}
                        >
                            <FcGoogle size={18} />
                            Continue with Google
                        </button>

                        <p className="mt-6 text-center text-xs text-gray-500">
                            New here?{" "}
                            <span
                                className="cursor-pointer text-indigo-400 hover:underline"
                                onClick={() => navigate("/register")}
                            >
                                Create an account
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default LoginCard