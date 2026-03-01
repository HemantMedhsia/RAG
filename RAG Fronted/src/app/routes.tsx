import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Upload from "../pages/Upload/Upload";
import Chat from "../pages/Chat/Chat";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AppLayout from "../components/layout/AppLayout";
import PrivateRoute from "../routes/PrivateRoute";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}