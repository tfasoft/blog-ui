import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Typography,
    CardActions,
} from "@mui/material";

import {useHistory} from "react-router-dom";

const BlogItem = (props) => {
    const blog = props.blog;
    const history = useHistory();

    return (
        <Card
            variant="outlined"
        >
            <CardHeader
                title={blog.title}
                sx={{
                    color: "primary.main"
                }}
            />
            <CardContent>
                <Typography>
                    {blog.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => history.push(`/blog/${blog._id}`)}
                >
                    Read this blog
                </Button>
            </CardActions>
        </Card>
    );
}

export default BlogItem;