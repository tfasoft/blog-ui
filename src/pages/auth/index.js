import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Card,
  CardContent,
  Snackbar,
  Alert,
  colors,
} from "@mui/material";

import API from "@/api";

import { setToken } from "@/redux/actions/token";
import { setUser } from "@/redux/actions/user";
import { Form } from "@/components";

import Head from "next/head";
import { useRouter } from "next/router";

const Authentication = () => {
  const dispatch = useDispatch();
  const history = useRouter();

  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state);

  useEffect(() => {
    if (token) history.push("/panel");
  }, [token]);

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
          background: `linear-gradient(to bottom, ${colors.blue[600]} 50%, #f1f1f1 50%)`,
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

export default Authentication;
