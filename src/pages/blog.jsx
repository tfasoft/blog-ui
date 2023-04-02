import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import DocumentMeta from "react-document-meta";

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
  Button,
  Alert,
  Snackbar,
  Toolbar,
  TextField,
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";

import API from "../api";

const BlogPage = () => {
  const history = useHistory();
  let { id } = useParams();

  const session = useSelector((state) => state.session);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackTitle, setSnackTitle] = useState("");
  const [snackType, setSnackType] = useState("");

  const createSnack = (title, type) => {
    setSnackTitle(title);
    setSnackType(type);

    setSnackOpen(true);
  };

  const [blog, setBlog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [content, setContent] = useState("");

  const getData = async () => {
    try {
      const data = await API.get(`blogs/${id}`);

      const blog = data.data;

      setBlog(blog);

      setTitle(blog.title);
      setShort(blog.short);
      setContent(blog.content);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //   const deleteBlog = () => {
  //     Axios.post(`${backendAPI}/blogs/delete/${id}`)
  //       .then((result) => {
  //         createSnack("Post deleted", "success");
  //         history.push("/blogs");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   const updateBlog = () => {
  //     const data = {
  //       id: id,
  //       new: {
  //         title,
  //         short,
  //         content,
  //       },
  //     };

  //     Axios.post(`${backendAPI}/blogs/update`, data)
  //       .then((result) => {
  //         createSnack("Post updated", "success");

  //         setEditMode(false);

  //         Axios.get(`${backendAPI}/blogs/get/${id}`)
  //           .then((result) => {
  //             const blog = result.data.blog;

  //             setBlog(blog);

  //             setTitle(blog.title);
  //             setShort(blog.short);
  //             setContent(blog.content);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  const meta = {
    title: blog.title,
    description: blog.short,
    canonical: `https://blog.amirhossein.info/blog/${blog._id}`,
    meta: {
      charset: "utf-8",
      name: {
        keywords: "tfasoft,tfasoft blog,blog,tfa",
      },
    },
    link: {
      rel: { icon: "../assets/icons/favicon.ico" },
    },
  };

  return (
    <DocumentMeta {...meta}>
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
                        // label="Title"
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
                  {/* <Box>
                                            <br />
                                            <Box
                                                component="img"
                                                alt="Image"
                                                sx={{ width: "100%", borderRadius: 5 }}
                                                src="https://images.prismic.io/www-static/3d094db1-bb3f-429d-8f13-5d16e3b39b68_Blog.png"
                                            />
                                            <br />
                                            <br />
                                        </Box> */}
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
                  {session && (
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
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}

        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={() => setSnackOpen(false)}
        >
          <Alert onClose={() => setSnackOpen(false)} severity={snackType}>
            {snackTitle}
          </Alert>
        </Snackbar>
      </Container>
    </DocumentMeta>
  );
};

export default BlogPage;
