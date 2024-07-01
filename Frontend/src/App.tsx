import { Route, Routes } from "react-router-dom";
import Auth from "./layouts/Auth";
import Register from "./features/Auth/Register/Register";
import Login from "./features/Auth/Login/Login";

export default function App() {
  return (
    <Routes>
      <Route element={<Auth />} path="auth">
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
