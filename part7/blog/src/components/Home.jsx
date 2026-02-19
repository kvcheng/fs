import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogsList from "./BlogList";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home = () => {
    const dispatch = useDispatch();

    const addBlog = (newBlog) => {
        dispatch(createBlog(newBlog));
    };

    const handleNotification = (message) => {
        dispatch(setNotification(message, 5000));
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: { xs: 18, sm: 20 },
                mb: 4,
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
                    Blog
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Stay in the loop with the latest articles
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Togglable buttonLabel="Create new Blog">
                    <BlogForm onCreate={addBlog} onNotification={handleNotification} />
                </Togglable>
            </Box>

            <Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                    Latest Posts
                </Typography>
                <BlogsList />
            </Box>
        </Container>
    );
};

export default Home;
