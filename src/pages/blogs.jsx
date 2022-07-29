import {
    Container,
    Grid,
} from "@mui/material";

import Axios from "axios";

import {useState, useEffect} from "react";
import BlogItem from "../components/blogitem";

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);

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
                pt: "1rem",
            }}
        >
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
    );
}

export default BlogsPage;