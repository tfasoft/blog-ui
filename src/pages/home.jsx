import {
    Container,
    Box,
    Typography, Toolbar,
} from "@mui/material";

const HomePage = () => {
    return (
        <Container
            sx={{
                mt: "1rem",
                mb: "1rem",
            }}
        >
            <Toolbar />
            <Box>
                <Typography
                    variant="h5"
                    color="primary"
                >
                    Home page
                </Typography>
            </Box>
        </Container>
    );
}

export default HomePage;