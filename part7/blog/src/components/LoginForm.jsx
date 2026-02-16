import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/loginReducer";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleNotification = (message) => {
        dispatch(setNotification(message, 5000));
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await dispatch(loginUser({ username, password }));
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user),
            );
            setUsername("");
            setPassword("");
            navigate("/");
        } catch {
            handleNotification("Invalid username or password");
        }
    };
    return (
        <div>
            <h2>Login:</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
