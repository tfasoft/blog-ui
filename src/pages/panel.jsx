import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

import Axios from "axios";

import { Parser } from 'html-to-react';

import {
    Container,
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    CircularProgress,
    Button,
    IconButton,
    Alert,
    Snackbar,
    Toolbar,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from "@mui/material";

import {
    Delete
} from "@mui/icons-material";

import {PanelBlogItem} from "../components/blogitem";

const PanelPage = () => {
    const history = useHistory();

    const session = useSelector(state => state.session);
    if (!session) history.push('/auth');

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackTitle, setSnackTitle] = useState('');
    const [snackType, setSnackType] = useState('');
    const createSnack = (title, type) => {
        setSnackTitle(title);
        setSnackType(type);

        setSnackOpen(true);
    }

    const deleteBlog = (blog_id) => {
        Axios.post(`http://localhost:8000/blogs/delete/${blog_id}`)
            .then((result) => {
                createSnack('Post deleted', 'success');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const [blogs, setBlogs] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:8000/blogs/all')
            .then((result) => {
                setBlogs(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [blogs]);

    return (
        <Container
            sx={{
                mt: "3rem",
                mb: "1rem",
            }}
        >
            <Toolbar />

            <Grid
                spacing={3}
                container
            >
                <Grid
                    md={6}
                    sm={12}
                    xs={12}
                    item
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: "primary.main" }}
                        gutterBottom
                    >
                        List of blogs
                    </Typography>
                    {
                        blogs
                        ?
                            <TableContainer
                                component={Paper}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: "primary.main" }}>Title</TableCell>
                                            <TableCell sx={{ color: "primary.main" }}>Short</TableCell>
                                            <TableCell sx={{ color: "primary.main" }}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {blogs.map((blog) => (
                                            <TableRow key={blog._id}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    onClick={() => history.push(`/blog/${blog._id}`)}
                                                    sx={{
                                                        color: "primary.main",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {blog.title}
                                                </TableCell>
                                                <TableCell>{blog.short}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => deleteBlog(blog._id)}
                                                        color="error"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        :
                            <Box
                                sx={{ textAlign: "center" }}
                            >
                                <CircularProgress />
                            </Box>
                    }
                </Grid>
            </Grid>

            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
                <Alert onClose={() => setSnackOpen(false)} severity={snackType}>
                    {snackTitle}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default PanelPage;