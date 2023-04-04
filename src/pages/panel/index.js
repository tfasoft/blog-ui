import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
} from "@mui/material";

import { Delete } from "@mui/icons-material";

import API from "@/api";
import { Table } from "@/components";
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
          <Table data={blogs} table="blogs" del={deleteBlog} />
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
