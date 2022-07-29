import {useState} from "react";
import {useHistory} from "react-router-dom";

import Axios from "axios";

import {
    Container,
    TextField,
    Button,
    Card,
    CardHeader,
    CardContent,
} from "@mui/material";

const AddBlogPage = () => {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addBlog = () => {
        const data = {
            title,
            content,
            author: "Amir",
        }

        Axios.post(`http://localhost:8000/blogs/add`, data)
            .then((result) => {
                history.push(`/blog/${result.data.id}`);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                pt: "1rem",
            }}
        >
            <Card
                variant="outlined"
            >
                <CardHeader
                    title="Add a new blog"
                    sx={{
                        color: "primary.main",
                        borderBottom: "solid 1px",
                        borderBottomColor: "divider"
                    }}
                />
                <CardContent>
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
                        placeholder="Enter your post here."
                        label="Blog content"
                        sx={{ mb: "1rem" }}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        multiline
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        onClick={() => addBlog()}
                        disableElevation
                    >
                        Add it
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}

export default AddBlogPage;