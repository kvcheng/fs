import { useDispatch, useSelector } from "react-redux";
import { removeBlog, updateBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams, useNavigate } from "react-router-dom";

const Blog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const user = useSelector((state) => state.login);
    const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
    if (!blog) return <div>Blog not found</div>;

    const deleteBlog = (deletedBlog) => {
        dispatch(removeBlog(deletedBlog));
        navigate("/");
    };

    const onUpdateBlog = (updatedBlog) => {
        dispatch(updateBlog(updatedBlog));
    };

    const handleNotification = (message) => {
        dispatch(setNotification(message, 5000));
    };

    const addLike = async (blog) => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        };
        try {
            onUpdateBlog(updatedBlog);
        } catch (err) {
            handleNotification("Error updating blog: " + err);
        }
    };

    const askRemoveBlog = async (blog) => {
        if (
            window.confirm(
                `Are you sure you want to remove the blog ${blog.title} by ${blog.author}?`,
            )
        ) {
            try {
                deleteBlog(blog);
                handleNotification(`Blog ${blog.title} removed successfully`);
            } catch (err) {
                handleNotification(
                    "Error removing blog: " +
                        (err.response.data.error || err.message),
                );
            }
        }
    };

    return (
        <div>
            <h2>
                {blog.title} by {blog.author}
            </h2>
            <p>{blog.url}</p>
            <p>{blog.likes} likes</p>
            <button onClick={() => addLike(blog)}>Like</button>
            <p>Added by {blog.user.name}</p>
            {user && user.id === blog.user.id && (
                <button onClick={() => askRemoveBlog(blog)}>Remove</button>
            )}
        </div>
    );
};

export default Blog;
