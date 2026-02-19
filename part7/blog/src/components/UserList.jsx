import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";

const UserList = () => {
    const users = useSelector((state) => state.users);
    
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
                    Users
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    View all blog authors and their contributions
                </Typography>
            </Box>

            <TableContainer component={Paper} variant="outlined">
                <Table sx={{ minWidth: 650 }} aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Blogs Created
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    "&:hover": { backgroundColor: "action.hover" },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link
                                        component={RouterLink}
                                        to={`/users/${user.id}`}
                                        underline="hover"
                                        color="primary"
                                        fontWeight={500}
                                    >
                                        {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    <Chip
                                        label={user.blogs.length}
                                        size="small"
                                        color={user.blogs.length > 0 ? "primary" : "default"}
                                        variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UserList;
