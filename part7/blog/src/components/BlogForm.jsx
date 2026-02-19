import { useState } from "react";
import blogsService from "../services/blogsService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
                `Failed to create new blog: ${err.response?.data?.error || err.message}`,
            );
        }
    };

    return (
        <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                Create a new blog
            </Typography>
            <Box component="form" onSubmit={handleNewBlog} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <TextField
                    label="Title"
                    name="title"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    required
                    fullWidth
                    size="small"
                />
                <TextField
                    label="Author"
                    name="author"
                    placeholder="Enter author name"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    required
                    fullWidth
                    size="small"
                />
                <TextField
                    label="URL"
                    name="url"
                    placeholder="Enter blog URL"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    required
                    fullWidth
                    size="small"
                    type="url"
                />
                <Button type="submit" variant="contained" size="medium">
                    Create Blog
                </Button>
            </Box>
        </Paper>
    );
};

export default BlogForm;
