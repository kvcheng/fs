import { useState } from "react";
 
const Blog = ({ blog, user, onLikeUpdate, onNotification, onDeleteUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);

  const addLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      onLikeUpdate(updatedBlog);
    } catch (err) {
      onNotification(
        "Error updating blog: " + (err),
      );
    }
  };

  const removeBlog = async (blog) => {
    if (
      window.confirm(
        `Are you sure you want to remove the blog ${blog.title} by ${blog.author}?`,
      )
    ) {
      try {
        onDeleteUpdate(blog);
        onNotification(`Blog ${blog.title} removed successfully`);
      } catch (err) {
        onNotification(
          "Error removing blog: " + (err.response.data.error || err.message),
        );
      }
    }
  };
  return (
    <div>
      <p>
        {blog.title} by {blog.author}
      </p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide" : "Show"} Details
      </button>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes</p>
          <button onClick={() => addLike(blog)}>Like</button>
          {user && user.id === blog.user.id && (
            <button onClick={() => removeBlog(blog)}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
