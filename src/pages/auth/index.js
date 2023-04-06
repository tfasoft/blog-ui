import { useState } from "react";
import { useDispatch } from "react-redux";

import { Container, Card, CardContent, Snackbar, Alert } from "@mui/material";

import API from "@/api";

import { setToken } from "@/redux/actions/token";
import { setUser } from "@/redux/actions/user";
import { hasAuth } from "@/middlewares";
import { Form } from "@/components";

import Head from "next/head";

const Authentication = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackTitle, setSnackTitle] = useState("");
  const [snackType, setSnackType] = useState("");

  const createSnack = (title, type) => {
    setSnackTitle(title);
    setSnackType(type);

    setSnackOpen(true);
  };

  const login = async (callback) => {
    setLoading(true);

    try {
      const { data } = await API.post("auth/login", callback);

      const user = data;

      dispatch(setToken(user.token));
      dispatch(setUser(user.user));

      setLoading(false);
    } catch (error) {
      console.log(error);
      createSnack(error.response.data.message, "error");

      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | TFAsoft</title>
      </Head>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: `linear-gradient(to bottom, ${"#071e4e"} 50%, #f8f4fc 50%)`,
        }}
      >
        <Container maxWidth="xs">
          <Card
            variant="elevation"
            elevation={20}
            sx={{ border: "none", borderRadius: 1 }}
          >
            <CardContent>
              <Form
                name="login"
                callback={login}
                button={loading ? "Wait" : "Login"}
                btnStyle={{
                  fullWidth: true,
                  disabled: loading,
                }}
              />
            </CardContent>
          </Card>
        </Container>

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
    </>
  );
};

export default hasAuth(Authentication);
