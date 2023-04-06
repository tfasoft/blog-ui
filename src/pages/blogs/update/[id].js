import {
  Container,
  Grid,
  Box,
  Typography,
  Toolbar,
  CardContent,
  Card,
} from "@mui/material";

import { Parser } from "html-to-react";

import Head from "next/head";
import { useRouter } from "next/router";

import API from "@/api";
import { Form } from "@/components";

import { useState } from "react";
import { useSelector } from "react-redux";

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

const Update = ({ blog, error }) => {
  const history = useRouter();

  const [content, setContent] = useState(blog.content);

  const { user } = useSelector((state) => state);

  const updateBlog = async (callback) => {
    callback.author = user._id;

    try {
      await API.patch(`blogs/${blog._id}`, callback);

      history.push(`/blogs/${blog._id}`);
    } catch (error) {}
  };

  const changeToParse = (changed) => {
    setContent(changed);
  };

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
        <title>Update blog | TFAsoft</title>
      </Head>
      <Box>
        <Container maxWidth="xl">
          <Toolbar />
          <Grid spacing={3} container>
            <Grid md={6} item>
              <Form
                name="newBlog"
                button="Update blog"
                btnStyle={{ fullWidth: true, disabled: false }}
                callback={updateBlog}
                def={blog}
                change={changeToParse}
              />
            </Grid>
            <Grid md={6} item>
              <Card
                variant="outlined"
                sx={{ mt: "1rem", border: "none", borderRadius: 5 }}
              >
                <CardContent>
                  <Typography>
                    <Box color="text.secondary">{Parser().parse(content)}</Box>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Update;
