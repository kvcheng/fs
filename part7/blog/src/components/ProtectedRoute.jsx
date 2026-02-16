import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/*
A component that aims to hide routes from unauthenticated users.
As implemented from these resources:
https://stackoverflow.com/questions/66289122/how-to-create-a-protected-route-with-react-router-dom
https://www.robinwieruch.de/react-router-private-routes/
*/

const ProtectedRoutes = () => {
    const user = useSelector((state) => state.login);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
