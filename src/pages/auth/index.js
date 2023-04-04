import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import API from "@/api";

import { setToken } from "@/redux/actions/token";
import { setUser } from "@/redux/actions/user";
import { hasAuth } from "@/middlewares";

const Authentication = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  console.log(state);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackTitle, setSnackTitle] = useState("");
  const [snackType, setSnackType] = useState("");

  const createSnack = (title, type) => {
    setSnackTitle(title);
    setSnackType(type);

    setSnackOpen(true);
  };

  const login = async () => {
    const sendingData = {
      username,
      password,
    };

    try {
      const data = await API.post("auth/login", sendingData);

      const user = data.data;

      dispatch(setToken(user.token));
      dispatch(setUser(user.user));
    } catch (error) {
      console.log(error);
      createSnack(error.response.data.message, "error");
    }
  };

  return (
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
            <Typography
              variant="h4"
              color="primary.main"
              fontWeight="bold"
              gutterBottom
            >
              TFAsoft blog
            </Typography>
            <br />
            <TextField
              variant="outlined"
              color="primary"
              size="small"
              placeholder="Enter username"
              label="Username"
              sx={{ mb: "1rem" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              variant="outlined"
              color="primary"
              size="small"
              placeholder="Enter password"
              label="Password"
              type="password"
              sx={{ mb: "1rem" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => login()}
              disableElevation
              fullWidth
            >
              Login
            </Button>
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
  );
};

export default hasAuth(Authentication);
