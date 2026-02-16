import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../reducers/loginReducer";
import { Link } from 'react-router-dom';
const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);

    if (!user) return null;
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav>
            <Link to="/">Home </Link>
            <Link to="/users">Users </Link>
            <Link to="/blogs">Blogs </Link>
            Welcome {user.name} <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Header