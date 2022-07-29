import {
    Container,
    Box,
    Typography,
} from "@mui/material";

const AuthenticationPage = () => {
    return (
        <Container
            sx={{
                pt: "1rem",
            }}
        >
            <Box>
                <Typography>
                    Auth
                </Typography>
            </Box>
        </Container>
    )
}

export default AuthenticationPage;