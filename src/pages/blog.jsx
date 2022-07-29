import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import Axios from "axios";

import {
    Container,
    Box,
    Typography,
    Divider,
} from "@mui/material";

const BlogPage = () => {
    let {blog_id} = useParams();

    const [blog, setBlog] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:8000/blogs/get/${blog_id}`)
            .then((result) => {
                setBlog(result.data.blog);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <Container
            maxWidth="md"
            sx={{
                pt: "1rem",
            }}
        >
            <Box>
                <Typography
                    variant="h4"
                    color="primary"
                    gutterBottom
                >
                    {blog.title}
                </Typography>
                <Typography
                    paragraph
                    gutterBottom
                >
                    {blog.content}
                </Typography>
                <Divider />
                <br />
                <Typography>
                    Author: {blog.author}
                </Typography>
            </Box>
        </Container>
    );
}

export default BlogPage;