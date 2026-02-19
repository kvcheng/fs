import { useState, useImperativeHandle } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const Togglable = (props) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(props.ref, () => {
        return { toggleVisibility };
    });

    return (
        <Box>
            {!visible && (
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={toggleVisibility}
                    sx={{ mb: 2 }}
                >
                    {props.buttonLabel}
                </Button>
            )}
            <Collapse in={visible}>
                <Box sx={{ mb: 3 }}>
                    {props.children}
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<CloseIcon />}
                        onClick={toggleVisibility}
                        sx={{ mt: 2 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Collapse>
        </Box>
    );
};

export default Togglable;
