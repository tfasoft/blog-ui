import {
  Container,
  Box,
  Typography,
  Toolbar,
  Grid,
  Button,
  colors,
} from "@mui/material";

import Head from "next/head";

import { useRouter } from "next/router";

export default function Home() {
  const history = useRouter();

  return (
    <>
      <Head>
        <title>TFAsoft Blog | Official TFAsoft Blog</title>
      </Head>
      <Box>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
            background: `linear-gradient(to bottom right, ${
              colors.blue[600]
            } 50%, ${"#f1f1f1"} 50%)`,
          }}
        >
          <Toolbar />
          <Container>
            <Grid spacing={2} container>
              <Grid md={4} sm={12} xs={12} item>
                <Box>
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    color="white"
                    gutterBottom
                  >
                    TFASoft blog
                  </Typography>
                  <Typography color="white" paragraph gutterBottom>
                    If you are following TFASoft service or you are on of out
                    costumers, you dont like to miss any news, change log, new
                    version and things like this!
                  </Typography>
                  <br />
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    sx={{
                      color: "white",
                    }}
                    onClick={() => history.push("/blogs")}
                    disableElevation
                  >
                    Read blogs
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Box>
    </>
  );
}
