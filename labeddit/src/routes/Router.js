import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import FeedPage from "../pages/FeedPage/FeedPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PostPage from "../pages/PostPage/PostPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

//ErrorPage não funciona???????????????????????????????????????????????

function Router() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<FeedPage/>} />

            <Route path="/login" element={<LoginPage/>} />

            <Route path="/register" element={<RegisterPage/>} />

            <Route path="/post/:id" element={<PostPage/>} />

            <Route element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default Router;
  