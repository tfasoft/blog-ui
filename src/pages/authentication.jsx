import {useState} from "react";
import {useSelector} from "react-redux";

import {
    Container,
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
} from "@mui/material";

import Axios from "axios";

const AuthenticationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const theme = useSelector(state => state.theme);

    const login = () => {
        Axios.post();
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
                            sx={{ mb: "1rem" }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            disableElevation
                            fullWidth
                        >
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </Container>
    )
}

export default AuthenticationPage;