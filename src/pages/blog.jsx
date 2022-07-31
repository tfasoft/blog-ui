import {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
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
    Alert,
    Snackbar, Toolbar
} from "@mui/material";

import {
    Delete
} from "@mui/icons-material";

const BlogPage = () => {
    const history = useHistory();
    let {blog_id} = useParams();

    const session = useSelector(state => state.session);

    const env = useSelector(state => state.env);
    const backendAPI = env.REACT_APP_BACKEND_API;

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackTitle, setSnackTitle] = useState('');
    const [snackType, setSnackType] = useState('');
    const createSnack = (title, type) => {
        setSnackTitle(title);
        setSnackType(type);

        setSnackOpen(true);
    }

    const [blog, setBlog] = useState(false);

    useEffect(() => {
        Axios.get(`${backendAPI}/blogs/get/${blog_id}`)
            .then((result) => {
                setBlog(result.data.blog);

                createSnack('Post loaded', 'info');
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const deleteBlog = () => {
        Axios.post(`${backendAPI}/blogs/delete/${blog_id}`)
            .then((result) => {
                createSnack('Post deleted', 'success');
                history.push('/blogs');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Container
            sx={{
                mt: "1rem",
                mb: "1rem",
            }}
        >
            <Toolbar />
            {
                blog
                ?
                    <Grid
                        spacing={2}
                        container
                    >
                        <Grid
                            md={9}
                            sm={8}
                            xs={12}
                            item
                        >
                            <Card
                                variant="outlined"
                                sx={{ border: "none", borderRadius: 5 }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        sx={{ color: "primary.main" }}
                                        gutterBottom
                                    >
                                        {blog.title}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        gutterBottom
                                        paragraph
                                    >
                                        {blog.short}
                                    </Typography>
                                    <Box>
                                        <br />
                                        <Box
                                            component="img"
                                            alt="Image"
                                            sx={{ width: "100%", borderRadius: 5 }}
                                            src="https://images.prismic.io/www-static/3d094db1-bb3f-429d-8f13-5d16e3b39b68_Blog.png"
                                        />
                                        <br />
                                        <br />
                                    </Box>
                                    <Box
                                        color="text.secondary"
                                    >
                                        {Parser().parse(blog.content)}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            md={3}
                            sm={4}
                            xs={12}
                            item
                        >
                            <Card
                                variant="outlined"
                                sx={{ border: "none", borderRadius: 5 }}
                            >
                                <CardContent>
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            sx={{ color: "primary.main" }}
                                            gutterBottom
                                        >
                                            Author
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                        >
                                            {blog.author}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <br />
                                        <Divider sx={{ borderColor: "primary.main" }} />
                                        <br />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            sx={{ color: "primary.main" }}
                                            gutterBottom
                                        >
                                            Posted at
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                        >
                                            {blog.createdAt}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <br />
                                        <Divider sx={{ borderColor: "primary.main" }} />
                                        <br />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            sx={{ color: "primary.main" }}
                                            gutterBottom
                                        >
                                            Total views
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                        >
                                            {blog.views}
                                        </Typography>
                                    </Box>
                                    {
                                        session
                                        &&
                                        <Box>
                                            <Box>
                                                <br />
                                                <Divider sx={{ borderColor: "error.main" }} />
                                                <br />
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ color: "error.main" }}
                                                    gutterBottom
                                                >
                                                    Danger zone
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    startIcon={<Delete />}
                                                    onClick={() => deleteBlog()}
                                                    disableElevation
                                                    fullWidth
                                                >
                                                    Delete blog
                                                </Button>
                                            </Box>
                                        </Box>
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                :
                    <Box
                        sx={{ textAlign: "center" }}
                    >
                        <CircularProgress />
                    </Box>
            }

            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
                <Alert onClose={() => setSnackOpen(false)} severity={snackType}>
                    {snackTitle}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default BlogPage;