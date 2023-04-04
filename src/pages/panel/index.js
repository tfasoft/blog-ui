import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import API from "@/api";

import {
  Container,
  Box,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
  Alert,
  Snackbar,
  Toolbar,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import { Delete } from "@mui/icons-material";
import { withAuth } from "@/middlewares";

const Panel = () => {
  const history = useRouter();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackTitle, setSnackTitle] = useState("");
  const [snackType, setSnackType] = useState("");

  const createSnack = (title, type) => {
    setSnackTitle(title);
    setSnackType(type);

    setSnackOpen(true);
  };

  const deleteBlog = async (id) => {
    try {
      const data = await API.delete(`blogs/${id}`);

      createSnack(data.data.message, "success");
      getBlogs();
    } catch (error) {
      createSnack(error.response.data.message, "error");
    }
  };

  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const data = await API.get("blogs");

      setBlogs(data.data);
    } catch (error) {
      createSnack(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Container
      sx={{
        mt: "3rem",
        mb: "1rem",
      }}
    >
      <Toolbar />

      <Grid spacing={3} container>
        <Grid md={6} sm={12} xs={12} item>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "primary.main" }}
            gutterBottom
          >
            List of blogs
          </Typography>
          {blogs ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "primary.main" }}>Title</TableCell>
                    <TableCell sx={{ color: "primary.main" }}>Short</TableCell>
                    <TableCell sx={{ color: "primary.main" }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs.reverse().map((blog) => (
                    <TableRow key={blog._id}>
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={() => history.push(`/blog/${blog._id}`)}
                        sx={{
                          color: "primary.main",
                          cursor: "pointer",
                        }}
                      >
                        {blog.title}
                      </TableCell>
                      <TableCell>{blog.short}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => deleteBlog(blog._id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>

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
  );
};

export default withAuth(Panel);
