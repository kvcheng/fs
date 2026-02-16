import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.users.find((u) => u.id === id));

    if (!user) return <div>User not found</div>;
    return (
        <div>
            <h2>{user.name}</h2>
            <p>Blogs created: {user.blogs.length}</p>
            <h2>Blogs added:</h2>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;
