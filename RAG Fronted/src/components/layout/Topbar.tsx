import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  Bell,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Topbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/5 px-6 backdrop-blur relative z-999">
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="md:hidden rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-gray-200"
        >
          ☰
        </button>

        <div className="text-sm text-gray-400">
          Ask your documents intelligently
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-gray-200">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500" />
        </button>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/5"
          >
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white">
                H
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-[#0E1320]" />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-xs font-medium text-gray-200">
                Hemant
              </p>
              <p className="text-[10px] text-gray-500">
                hemant@company.com
              </p>
            </div>

            <ChevronDown
              size={14}
              className="text-gray-400"
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0E1320] p-1 shadow-xl z-999">
              <MenuItem icon={User} label="Profile" />
              <MenuItem icon={Settings} label="Settings" />

              <div className="my-1 h-px bg-white/10" />

              <MenuItem
                onClick={() => logout()}
                icon={LogOut}
                label="Logout"
                danger
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuItem({
  onClick,
  icon: Icon,
  label,
  danger,
}: {
  onClick?: () => void;
  icon: any;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${danger
        ? "text-red-400 hover:bg-red-500/10"
        : "text-gray-300 hover:bg-white/5"
        }`}
      onClick={onClick}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
