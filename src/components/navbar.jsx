import {useState} from "react";
import {useHistory} from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Container,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    Alert,
    Snackbar,
} from "@mui/material";

import Axios from "axios";

const Navbar = () => {
    const history = useHistory();

    const [dialogOpen, setDialogOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [short, setShort] = useState('');
    const [content, setContent] = useState('');

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackTitle, setSnackTitle] = useState('');
    const [snackType, setSnackType] = useState('');
    const createSnack = (title, type) => {
        setSnackTitle(title);
        setSnackType(type);

        setSnackOpen(true);
    }

    const addBlog = () => {
        const data = {
            title,
            content,
            short,
            author: "Amir",
        }

        Axios.post(`http://localhost:8000/blogs/add`, data)
            .then((result) => {
                setTitle('');
                setShort('');
                setContent('');

                createSnack('Posted successfully', 'success');
            })
            .catch((error) => {
                console.log(error);
            })
    }

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
                                flexGrow: 1,
                            }}
                        >
                            TFASoft Blog
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => setDialogOpen(true)}
                            sx={{
                                color: "white"
                            }}
                        >
                            Add a new blog
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <DialogTitle
                    color="primary.main"
                >
                    Add a new blog
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can add a new blog and talk about what happan and what is going on!
                    </DialogContentText>
                    <br />
                    <TextField
                        variant="outlined"
                        color="primary"
                        size="small"
                        placeholder="Pick a fantastic title!"
                        label="Blog title"
                        sx={{ mb: "1rem" }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        color="primary"
                        size="small"
                        placeholder="Describe this blog in a single sentence"
                        label="Blog short description"
                        sx={{ mb: "1rem" }}
                        value={short}
                        onChange={(e) => setShort(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        color="primary"
                        size="small"
                        placeholder="Enter your post here."
                        label="Blog content"
                        sx={{ mb: "1rem" }}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        multiline
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => addBlog()}
                        disableElevation
                    >
                        Add it
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
                <Alert onClose={() => setSnackOpen(false)} severity={snackType}>
                    {snackTitle}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Navbar;