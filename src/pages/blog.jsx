import {useParams} from "react-router-dom";

import {
    Container,
    Box,
    Typography,
} from "@mui/material";

const BlogPage = () => {
    const {bid} = useParams();

    return (
        <Container
            sx={{
                pt: "1rem",
            }}
        >
            <Box>
                <Typography>
                    {bid}
                </Typography>
            </Box>
        </Container>
    );
}

export default BlogPage;