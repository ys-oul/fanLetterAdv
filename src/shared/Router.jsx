import Detail from "pages/Detail";
import Home from "pages/Home";
import Login from "pages/Login";
import Mypage from "pages/Mypage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage/:userId" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}
