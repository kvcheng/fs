import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogsList from "./BlogList";

const Home = () => {
    const dispatch = useDispatch();

    const addBlog = (newBlog) => {
        dispatch(createBlog(newBlog));
    };

    const handleNotification = (message) => {
        dispatch(setNotification(message, 5000));
    };

    return (
        <div>
            <h2>Blogs</h2>
            <Togglable buttonLabel="Create new Blog">
                <BlogForm
                    onCreate={addBlog}
                    onNotification={handleNotification}
                />
            </Togglable>
            <BlogsList />
        </div>
    );
};

export default Home;
