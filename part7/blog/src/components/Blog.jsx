import { useDispatch, useSelector } from "react-redux";
import { removeBlog, updateBlog, updateComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const Blog = () => {
    const [comment, setComment] = useState("");
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

    const onUpdateBlogComment = (blogId, comment) => {
        dispatch(updateComment(blogId, comment));
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

    const addComment = async (event) => {
        event.preventDefault()

        try {
            onUpdateBlogComment(blog.id, comment);
            setComment("");
            handleNotification(`Comment added to blog ${blog.title}`);
        } catch (err) {
            handleNotification("Error adding comment: " + err);
        }
    }

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
            <h3>Comments</h3>
            <form onSubmit={addComment}>
                <label> Comment: 
                    <input type="text" placeholder="Add a comment" value={comment} onChange={({ target }) => setComment(target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <ul>
                {blog.comments.map((c, index) => (
                    <li key={index}>{c.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Blog;
