import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

import { useRouter } from "next/router";

import { formatDistanceToNow } from "date-fns";

const BlogItem = (props) => {
  const blog = props.blog;

  const history = useRouter();

  return (
    <Card
      variant="elevation"
      elevation={21}
      sx={{
        border: "none",
        borderRadius: 5,
      }}
    >
      <CardMedia
        component="img"
        onClick={() => history.push(`/blogs/${blog._id}`)}
        sx={{
          cursor: "pointer",
        }}
        image="https://images.prismic.io/www-static/3d094db1-bb3f-429d-8f13-5d16e3b39b68_Blog.png"
        alt="Card media"
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {blog.title}
        </Typography>
        <Typography gutterBottom paragraph>
          {blog.short}
        </Typography>
        <Divider />
        <br />
        <Typography variant="body2">
          Posted by {blog.author.name}{" "}
          {formatDistanceToNow(new Date(blog.createdAt))} ago
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogItem;
