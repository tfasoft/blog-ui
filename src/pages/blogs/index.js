import {
  Container,
  Grid,
  CircularProgress,
  Box,
  Typography,
  Toolbar,
  colors,
} from "@mui/material";

import API from "@/api";
import { BlogItem } from "@/components";
import Head from "next/head";

export const getServerSideProps = async () => {
  try {
    const blogs = await API.get("blogs");

    return {
      props: {
        blogs: blogs.data,
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

const Blogs = ({ blogs, error }) => {
  if (error) {
    return (
      <Box>
        <Typography>Error</Typography>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Blogs | TFAsoft</title>
      </Head>
      <Box>
        <Container
          maxWidth="xl"
          sx={{
            mb: "5rem",
            background: `linear-gradient(to bottom, ${
              colors.blue[600]
            } 60%, ${"#f1f1f1"} 40%)`,
          }}
        >
          <Toolbar />
          {blogs ? (
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
              <Grid spacing={3} container>
                {blogs.map((blog) => {
                  return (
                    <Grid key={blog._id} md={4} sm={6} xs={12} item>
                      <BlogItem blog={blog} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          ) : (
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <CircularProgress
                sx={{
                  mt: "3rem",
                }}
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Blogs;
