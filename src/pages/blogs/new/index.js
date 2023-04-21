import {
  Container,
  Grid,
  Box,
  Typography,
  Toolbar,
  CardContent,
  Card,
} from "@mui/material";

import ReactMarkdown from "react-markdown";

import Head from "next/head";
import { useRouter } from "next/router";

import API from "@/api";
import { Form } from "@/components";

import { useState } from "react";
import { useSelector } from "react-redux";

const New = () => {
  const history = useRouter();

  const [content, setContent] = useState("");

  const { user } = useSelector((state) => state);

  const addBlog = async (callback) => {
    callback.author = user._id;

    try {
      const { data } = await API.post("blogs", callback);

      history.push(`/blogs/${data.id}`);
    } catch (error) {}
  };

  const changeToParse = (changed) => {
    setContent(changed);
  };

  return (
    <>
      <Head>
        <title>New blog | TFAsoft</title>
      </Head>
      <Box>
        <Container maxWidth="xl">
          <Toolbar />
          <Grid spacing={3} container>
            <Grid md={6} item>
              <Form
                name="newBlog"
                button="Add blog"
                btnStyle={{ fullWidth: true, disabled: false }}
                callback={addBlog}
                change={changeToParse}
              />
            </Grid>
            <Grid md={6} item>
              <Card
                variant="outlined"
                sx={{ mt: "1rem", border: "none", borderRadius: 5 }}
              >
                <CardContent>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default New;
