import { useDispatch, useSelector } from "react-redux";
import { removeBlog, updateBlog, updateComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";

const Blog = () => {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const user = useSelector((state) => state.login);
    const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
    
    if (!blog) {
        return (
            <Container maxWidth="md" sx={{ mt: { xs: 18, sm: 20 } }}>
                <Typography variant="h5">Blog not found</Typography>
            </Container>
        );
    }

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
        event.preventDefault();

        try {
            onUpdateBlogComment(blog.id, comment);
            setComment("");
            handleNotification(`Comment added to blog ${blog.title}`);
        } catch (err) {
            handleNotification("Error adding comment: " + err);
        }
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                mt: { xs: 18, sm: 20 },
                mb: 4,
            }}
        >
            <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: 1, borderColor: "divider" }}>
                {/* Blog Header */}
                <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
                    {blog.title}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
                    <Typography variant="subtitle1" color="text.secondary">
                        by {blog.author}
                    </Typography>
                    <Chip label={blog.user.name} size="small" />
                </Box>

                {/* Blog URL */}
                <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                    <LinkIcon fontSize="small" color="action" />
                    <Typography
                        variant="body2"
                        component="a"
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                        {blog.url}
                    </Typography>
                </Box>

                {/* Likes and Actions */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton
                            color="error"
                            onClick={() => addLike(blog)}
                            aria-label="like"
                        >
                            {blog.likes > 0 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Typography variant="body1" fontWeight={600}>
                            {blog.likes} {blog.likes === 1 ? "like" : "likes"}
                        </Typography>
                    </Box>
                    {user && user.id === blog.user.id && (
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => askRemoveBlog(blog)}
                        >
                            Remove
                        </Button>
                    )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Comments Section */}
                <Box>
                    <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                        Comments ({blog.comments?.length || 0})
                    </Typography>

                    {/* Add Comment Form */}
                    <Box component="form" onSubmit={addComment} sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={({ target }) => setComment(target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button type="submit" variant="contained" disabled={!comment.trim()}>
                            Add Comment
                        </Button>
                    </Box>

                    {/* Comments List */}
                    {blog.comments && blog.comments.length > 0 ? (
                        <List>
                            {blog.comments.map((c, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        px: 0,
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <ListItemText
                                        primary={c.content}
                                        primaryTypographyProps={{
                                            variant: "body1",
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                            No comments yet. Be the first to comment!
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default Blog;
