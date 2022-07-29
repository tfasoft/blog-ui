import {
    AppBar,
    Toolbar,
    Container,
    Typography,
    Box,
} from "@mui/material";

const Navbar = (props) => {
    return (
        <Box>
            <AppBar
                elevation={0}
            >
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                        >
                            TFASoft Blog
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </Box>
    );
}

export default Navbar;