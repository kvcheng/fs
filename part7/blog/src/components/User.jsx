import { useSelector } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

const User = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.users.find((u) => u.id === id));

    if (!user) {
        return (
            <Container maxWidth="md" sx={{ mt: { xs: 18, sm: 20 } }}>
                <Typography variant="h5">User not found</Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                mt: { xs: 18, sm: 20 },
                mb: 4,
            }}
        >
            <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: 1, borderColor: "divider" }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
                        {user.name}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Chip
                            label={`${user.blogs.length} ${user.blogs.length === 1 ? "blog" : "blogs"}`}
                            color="primary"
                            variant="outlined"
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box>
                    <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                        Added blogs
                    </Typography>
                    {user.blogs.length > 0 ? (
                        <List>
                            {user.blogs.map((blog) => (
                                <ListItem key={blog.id} disablePadding>
                                    <ListItemButton component={RouterLink} to={`/blogs/${blog.id}`}>
                                        <ListItemText
                                            primary={blog.title}
                                            primaryTypographyProps={{
                                                fontWeight: 500,
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mt: 2 }}>
                            No blogs added yet.
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default User;
