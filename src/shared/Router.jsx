import Detail from "pages/Detail";
import Home from "pages/Home";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
