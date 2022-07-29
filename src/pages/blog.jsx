import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import Axios from "axios";

import {
    Container,
    Box,
    Typography,
    Divider,
    CircularProgress,
} from "@mui/material";

const BlogPage = () => {
    let {blog_id} = useParams();

    const [blog, setBlog] = useState(false);

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
            {
                blog
                ?
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

export default BlogPage;