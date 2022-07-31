import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

import {useHistory} from "react-router-dom";

const BlogItem = (props) => {
    const blog = props.blog;
    const history = useHistory();

    return (
        <Card
            variant="elevation"
            elevation={21}
            sx={{ border: "none", borderRadius: 5 }}
        >
            <CardContent>
                <Box
                    component="img"
                    alt="Image"
                    sx={{ width: "100%", borderRadius: 5, cursor: "pointer" }}
                    onClick={() => history.push(`/blog/${blog._id}`)}
                    src="https://images.prismic.io/www-static/3d094db1-bb3f-429d-8f13-5d16e3b39b68_Blog.png"
                />
                <Typography
                    variant="h4"
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
            </CardContent>
        </Card>
    );
}

export default BlogItem;