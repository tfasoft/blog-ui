import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Container, Box, Grid, Alert, Snackbar, Toolbar } from "@mui/material";

import { Table } from "@/components";
import API from "@/api";

import Head from "next/head";
import { useRouter } from "next/router";

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

  const { token } = useSelector((state) => state);

  useEffect(() => {
    if (!token) history.push("/auth");
  }, [token]);

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <Head>
        <title>Panel | TFAsoft</title>
      </Head>
      <Box>
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
      </Box>
    </>
  );
};

export default Panel;
