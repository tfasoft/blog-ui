import {useSelector} from "react-redux";
import {
    Container,
    Grid,
    CircularProgress,
    Box,
    Typography, Toolbar,
} from "@mui/material";

import Axios from "axios";

import {useState, useEffect} from "react";
import BlogItem from "../components/blogitem";

const BlogsPage = () => {
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

    const theme = useSelector(state => state.theme);

    return (
        <Container
            maxWidth="xl"
            sx={{
                mb: "5rem",
                background: `linear-gradient(to bottom, ${ theme === "light" ? "#071e4e" : "#222" } 60%, ${ theme === "light" ? "#f8f4fc" : "#333" } 40%)`,
            }}
        >
            <Toolbar />
            {
                blogs
                ?
                    <Container
                        sx={{
                            mt: "5rem",
                        }}
                    >
                        <Typography
                            variant="h2"
                            fontWeight="bold"
                            color="white"
                            gutterBottom
                        >
                            Featured posts
                        </Typography>
                        <Grid
                            spacing={3}
                            container
                        >
                            {
                                blogs.map((blog) => {
                                    return (
                                        <Grid
                                            md={4}
                                            sm={6}
                                            xs={12}
                                            item
                                        >
                                            <BlogItem blog={blog} />
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </Container>
                :
                    <Box
                        sx={{ textAlign: "center" }}
                    >
                        <CircularProgress />
                    </Box>
            }
        </Container>
    );
}

export default BlogsPage;