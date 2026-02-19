import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Notification = () => {
    const message = useSelector((state) => state.notification);

    return (
        <Snackbar
            open={Boolean(message)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{ mt: 8 }}
        >
            <Alert severity="info" variant="filled" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
