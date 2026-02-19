import { useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { useDispatch } from "react-redux";
import { initialiseBlogs } from "./reducers/blogReducer";
import { Routes, Route } from "react-router-dom";
import { initialiseUsers } from "./reducers/usersReducer";
import UserList from "./components/UserList";
import ProtectedRoutes from "./components/ProtectedRoute";
import Home from "./components/Home";
import User from "./components/User";
import Blog from "./components/Blog";
import Header from "./components/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialiseBlogs());
        dispatch(initialiseUsers());
    }, [dispatch]);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <CssBaseline />
            <Notification />
            <Header />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="*" element={<Home />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/blogs/:id" element={<Blog />} />
                </Route>
            </Routes>
        </Box>
    );
};
export default App;
