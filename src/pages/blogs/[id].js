import { useState } from "react";

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
  TextField,
} from "@mui/material";

export const getServerSidePaths = async () => {
  const paths = [];

  try {
    const data = await API.get("blogs");

    data.data.map((dt) => paths.push({ params: { id: dt._id } }));
  } catch (error) {
    console.log(error.message);
  }

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
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [content, setContent] = useState("");

  console.log(blog, error);

  if (error) {
    return (
      <Box>
        <Typography>{error.message}</Typography>
      </Box>
    );
  }

  return (
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
              <Card variant="outlined" sx={{ border: "none", borderRadius: 5 }}>
                <CardContent>
                  {editMode ? (
                    <Box>
                      <TextField
                        // label="Title"
                        placeholder="Change title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        fullWidth
                      />
                      <br />
                      <br />
                    </Box>
                  ) : (
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      sx={{ color: "primary.main" }}
                      gutterBottom
                    >
                      {blog.title}
                    </Typography>
                  )}
                  {editMode ? (
                    <Box>
                      <TextField
                        placeholder="Change short"
                        onChange={(e) => setShort(e.target.value)}
                        value={short}
                        fullWidth
                      />
                      <br />
                      <br />
                    </Box>
                  ) : (
                    <Typography color="text.secondary" gutterBottom paragraph>
                      {blog.short}
                    </Typography>
                  )}
                  {editMode ? (
                    <Box>
                      <TextField
                        // label="Title"
                        placeholder="Change content"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        rows={5}
                        multiline
                        fullWidth
                      />
                      <br />
                      <br />
                    </Box>
                  ) : (
                    <Box color="text.secondary">
                      {Parser().parse(blog.content)}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid md={3} sm={4} xs={12} item>
              <Card variant="outlined" sx={{ border: "none", borderRadius: 5 }}>
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
                    <Typography color="text.secondary">{blog.views}</Typography>
                  </Box>
                  {/* {session && (
                    <Box>
                      <Box>
                        <br />
                        <Divider sx={{ borderColor: "info.main" }} />
                        <br />
                      </Box>
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ color: "info.main" }}
                          gutterBottom
                        >
                          Update blog
                        </Typography>
                        {!editMode ? (
                          <Button
                            variant="contained"
                            color="info"
                            startIcon={<Edit />}
                            onClick={() => setEditMode(true)}
                            disableElevation
                            fullWidth
                          >
                            Edit blog
                          </Button>
                        ) : (
                          <Grid spacing={2} container>
                            <Grid md={6} sm={6} xs={6} item>
                              <Button
                                variant="outlined"
                                color="info"
                                onClick={() => setEditMode(false)}
                                disableElevation
                                fullWidth
                              >
                                Cancel
                              </Button>
                            </Grid>
                            <Grid md={6} sm={6} xs={6} item>
                              <Button
                                variant="contained"
                                color="info"
                                // onClick={() => updateBlog()}
                                disableElevation
                                fullWidth
                              >
                                Update
                              </Button>
                            </Grid>
                          </Grid>
                        )}
                      </Box>
                      <Box>
                        <br />
                        <Divider sx={{ borderColor: "error.main" }} />
                        <br />
                      </Box>
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ color: "error.main" }}
                          gutterBottom
                        >
                          Danger zone
                        </Typography>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Delete />}
                          //   onClick={() => deleteBlog()}
                          disableElevation
                          fullWidth
                        >
                          Delete blog
                        </Button>
                      </Box>
                    </Box>
                  )} */}
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
  );
};

export default Blog;
