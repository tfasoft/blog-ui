import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {
    Container,
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";

import Axios from "axios";

import {setUID} from "../redux/actions/uid";
import {logoinUser} from "../redux/actions/session";
import {createUser} from "../redux/actions/user";

const AuthenticationPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const session = useSelector(state => state.session);
    if (session) history.push('/panel');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackTitle, setSnackTitle] = useState('');
    const [snackType, setSnackType] = useState('');
    const createSnack = (title, type) => {
        setSnackTitle(title);
        setSnackType(type);

        setSnackOpen(true);
    }

    const theme = useSelector(state => state.theme);

    const login = () => {
        const data = {
            username,
            password,
        }

        Axios.post('http://localhost:8000/auth/login', data)
            .then((result) => {
                const author = result.data.author;

                dispatch(setUID(author._id));
                dispatch(logoinUser());
                dispatch(createUser(author));
            })
            .catch((error) => {
                createSnack(error.response.data.message, 'error');
            });
    }

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: `linear-gradient(to bottom, ${ theme === "light" ? "#071e4e" : "#222" } 50%, ${ theme === "light" ? "#f8f4fc" : "#333" } 50%)`,
            }}
        >
            <Container
                maxWidth="xs"
            >
                <Card
                    variant="elevation"
                    elevation={20}
                    sx={{ border: "none", borderRadius: 5 }}
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
                            onClick={() => login()}
                            disableElevation
                            fullWidth
                        >
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </Container>

            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
                <Alert onClose={() => setSnackOpen(false)} severity={snackType}>
                    {snackTitle}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default AuthenticationPage;