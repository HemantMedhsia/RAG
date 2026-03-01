import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchMe, logoutApi } from "../../api/auth.api";

type AuthContextType = {
    isAuthenticated: boolean | null;
    user: any;
    logout: () => void;
    setAuthUser: (user: any) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<any>(null);

    const navigate = useNavigate();
    const location = useLocation();

    // 🌐 public routes jahan auth check nahi karna
    const isPublicRoute =
        location.pathname === "/login" ||
        location.pathname === "/register";

    useEffect(() => {
        // 🔥 login / register par auth bootstrap skip
        if (isPublicRoute) {
            setIsAuthenticated(false);
            setUser(null);
            return;
        }

        // 🔐 protected routes → auth check
        fetchMe()
            .then((data) => {
                setUser(data);
                setIsAuthenticated(true);
            })
            .catch(() => {
                setUser(null);
                setIsAuthenticated(false);
            });
    }, [isPublicRoute]);

    useEffect(() => {
        const handler = () => {
            setUser(null);
            setIsAuthenticated(false);
            navigate("/login", { replace: true });
        };

        window.addEventListener("SESSION_EXPIRED", handler);
        return () => window.removeEventListener("SESSION_EXPIRED", handler);
    }, []);

    const logout = async () => {
        try {
            await logoutApi();
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            navigate("/login", { replace: true });
        }
    };

    const setAuthUser = (user: any) => {
        setUser(user);
        setIsAuthenticated(true);
    };

    // ⛔ loader sirf protected routes par
    if (isAuthenticated === null && !isPublicRoute) {
        return <div>Checking session...</div>;
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, logout, setAuthUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
};