import {
    Container,
    Box,
    Typography,
} from "@mui/material";

const HomePage = () => {
    return (
        <Container
            sx={{
                pt: "1rem",
            }}
        >
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