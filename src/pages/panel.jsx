import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

import Axios from "axios";

import DocumentMeta from 'react-document-meta';

import {
    Container,
    Box,
    Typography,
    Grid,
    CircularProgress,
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

const PanelPage = () => {
    const history = useHistory();

    const env = useSelector(state => state.env);
    const backendAPI = env.REACT_APP_BACKEND_API;

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
        Axios.post(`${backendAPI}/blogs/delete/${blog_id}`)
            .then((result) => {
                createSnack('Post deleted', 'success');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const [blogs, setBlogs] = useState(false);

    useEffect(() => {
        Axios.get(`${backendAPI}/blogs/all`)
            .then((result) => {
                setBlogs(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [blogs]);

    const meta = {
        title: "Admin panel",
        description: 'TFAsoft admin panel',
        canonical: 'https://blog.amirhossein.info/panel',
        meta: {
            charset: 'utf-8',
            name: {
            keywords: 'tfasoft,tfasoft blog,blog,tfa'
            }
        },
        link: {
            rel: { icon: "../assets/icons/favicon.ico" },
        },
    }

    return (
        <DocumentMeta {...meta}>
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
                                            {blogs.reverse().map((blog) => (
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
        </DocumentMeta>
    );
}

export default PanelPage;