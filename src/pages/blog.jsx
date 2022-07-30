import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import Axios from "axios";

import {
    Container,
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
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

    console.log(blog)

    return (
        <Container
            sx={{
                mt: "1rem",
                mb: "1rem",
            }}
        >
            {
                blog
                ?
                    <Grid
                        spacing={2}
                        container
                    >
                        <Grid
                            md={9}
                            sm={6}
                            xs={12}
                            item
                        >
                            <Card
                                variant="outlined"
                                sx={{ borderColor: "white", borderRadius: 5 }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h3"
                                        sx={{ cursor: "pointer", color: "primary.main" }}
                                        gutterBottom
                                    >
                                        {blog.title}
                                    </Typography>
                                    <Box>
                                        <br />
                                        <Box
                                            component="img"
                                            alt="Image"
                                            sx={{ width: "100%", borderRadius: 5, cursor: "pointer" }}
                                            src="https://images.prismic.io/www-static/3d094db1-bb3f-429d-8f13-5d16e3b39b68_Blog.png"
                                        />
                                        <br />
                                        <br />
                                    </Box>
                                    <Typography
                                        color="text.secondary"
                                        paragraph
                                        gutterBottom
                                    >
                                        {blog.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            md={3}
                            sm={6}
                            xs={12}
                            item
                        >
                            <Card
                                variant="outlined"
                                sx={{ borderColor: "white", borderRadius: 5 }}
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
                                            gutterBottom
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
                                            gutterBottom
                                        >
                                            {blog.createdAt}
                                        </Typography>
                                    </Box>
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
        </Container>
    );
}

export default BlogPage;