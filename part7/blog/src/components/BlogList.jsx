import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);

    return (
        <ul>
            {blogs.map((blog) => (
                <li key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default BlogList;
