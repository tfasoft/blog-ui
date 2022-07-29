import {useHistory} from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Container,
    Typography,
    Box,
} from "@mui/material";

const Navbar = () => {
    const history = useHistory();

    return (
        <Box>
            <AppBar
                elevation={0}
            >
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            onClick={() => history.push('/')}
                            sx={{
                                cursor: "pointer",
                            }}
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