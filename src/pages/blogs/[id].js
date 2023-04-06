import API from "@/api";

import { Parser } from "html-to-react";
import { formatDistanceToNow } from "date-fns";

import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Toolbar,
} from "@mui/material";

import Head from "next/head";

export const getServerSidePaths = async () => {
  const paths = [];

  try {
    const data = await API.get("blogs");

    data.data.map((dt) => paths.push({ params: { id: dt._id } }));
  } catch (error) {}

  return {
    paths,
    fallback: false,
  };
};

export const getServerSideProps = async ({ params }) => {
  try {
    const blog = await API.get(`blogs/${params.id}`);

    return {
      props: {
        blog: blog.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.response.data,
      },
    };
  }
};

const Blog = ({ blog, error }) => {
  if (error) {
    return (
      <Box>
        <Typography>{error.message}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.title} | TFAsoft</title>
      </Head>
      <Box>
        <Container
          sx={{
            mt: "1rem",
            mb: "1rem",
          }}
        >
          <Toolbar />
          {blog ? (
            <Grid spacing={2} container>
              <Grid md={9} sm={8} xs={12} item>
                <Card
                  variant="outlined"
                  sx={{ border: "none", borderRadius: 1 }}
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
                    <Typography color="text.secondary" gutterBottom paragraph>
                      {blog.short}
                    </Typography>
                    <Box color="text.secondary">
                      {Parser().parse(blog.content)}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid md={3} sm={4} xs={12} item>
                <Card
                  variant="outlined"
                  sx={{ border: "none", borderRadius: 1 }}
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
                      <Typography color="text.secondary">
                        {blog.author.name}
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
                      <Typography color="text.secondary">
                        {formatDistanceToNow(new Date(blog.createdAt))} ago
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
                      <Typography color="text.secondary">
                        {blog.views}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Blog;
