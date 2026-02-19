import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);

    return (
        <Grid container spacing={3}>
            {blogs.map((blog) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog.id}>
                    <Card
                        variant="outlined"
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            "&:hover": {
                                boxShadow: 3,
                            },
                        }}
                    >
                        <CardActionArea component={RouterLink} to={`/blogs/${blog.id}`} sx={{ flexGrow: 1 }}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="h3"
                                    gutterBottom
                                    fontWeight={600}
                                    sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                    }}
                                >
                                    {blog.title}
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        by {blog.author}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                                    <Chip label={`${blog.likes} likes`} size="small" variant="outlined" />
                                    <Chip
                                        label={`${blog.comments?.length || 0} comments`}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default BlogList;
