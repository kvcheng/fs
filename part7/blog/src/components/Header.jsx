import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";
import { Link as RouterLink } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: "blur(24px)",
    border: "1px solid",
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: "8px 12px",
}));

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    if (!user) return null;

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 0,
                bgcolor: "transparent",
                backgroundImage: "none",
                mt: "calc(var(--template-frame-height, 0px) + 28px)",
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                color: "text.primary",
                                textDecoration: "none",
                                fontWeight: 700,
                                mr: 2,
                            }}
                        >
                            Blog
                        </Typography>
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <Button
                                variant="text"
                                color="info"
                                size="small"
                                component={RouterLink}
                                to="/blogs"
                            >
                                Blogs
                            </Button>
                            <Button
                                variant="text"
                                color="info"
                                size="small"
                                component={RouterLink}
                                to="/users"
                            >
                                Users
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="body2" sx={{ mr: 1 }}>
                            {user.name}
                        </Typography>
                        <Button color="primary" variant="contained" size="small" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    top: "var(--template-frame-height, 0px)",
                                },
                            }}
                        >
                            <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem component={RouterLink} to="/blogs" onClick={toggleDrawer(false)}>
                                    Blogs
                                </MenuItem>
                                <MenuItem component={RouterLink} to="/users" onClick={toggleDrawer(false)}>
                                    Users
                                </MenuItem>
                                <Divider sx={{ my: 1 }} />
                                <MenuItem>
                                    <Typography variant="body2">Welcome, {user.name}</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        fullWidth
                                        onClick={() => {
                                            handleLogout();
                                            toggleDrawer(false)();
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
};

export default Header;