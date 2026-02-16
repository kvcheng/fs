import { useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from "./reducers/notificationReducer";
import { createBlog, initialiseBlogs, removeBlog, updateBlog } from "./reducers/blogReducer";
import { initialiseUsers, logoutUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(initialiseUsers())
  }, [dispatch]);

  const handleNotification = (message) => {
    dispatch(setNotification(message, 5000));
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const loginForm = () => {
    return (
      <LoginForm onNotification={handleNotification} />
    );
  };

  const deleteBlog = (deletedBlog) => {
    dispatch(removeBlog(deletedBlog))
  };

  const onUpdateBlog = (updatedBlog) => {
    dispatch(updateBlog(updatedBlog))
  };

  const addBlog = (newBlog) => {
    dispatch(createBlog(newBlog))
  };

  const blogForm = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>Welcome {user.name}</p>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="Create new Blog">
          <BlogForm onCreate={addBlog} onNotification={handleNotification} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            onLikeUpdate={onUpdateBlog}
            onNotification={handleNotification}
            onDeleteUpdate={deleteBlog}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notification />
      {user ? blogForm() : loginForm()}
    </div>
  );
};
export default App;
