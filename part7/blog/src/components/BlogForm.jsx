import { useState } from "react";
import blogsService from "../services/blogsService";

const BlogForm = ({ onCreate, onNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    try {
      const newBlog = await blogsService.createBlog(blogObject);
      onCreate(newBlog);
      onNotification(`New blog ${title} created successfully`);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (err) {
      onNotification(
        `Failed to create new blog: ${err.response.data.error || err.message}`,
      );
    }
  };

  return (
    <form onSubmit={handleNewBlog}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
      </label>
      <label>
        URL:
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
