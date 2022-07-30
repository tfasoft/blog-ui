import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ThemeProvider, createTheme, CssBaseline, colors as Colors} from "@mui/material";

import Navbar from "./components/navbar";

import AuthenticationPage from "./pages/authentication";
import BlogPage from "./pages/blog";
import BlogsPage from "./pages/blogs";
import HomePage from "./pages/home";

function App() {
    const mode = "dark";

    const theme = createTheme({
        palette: {
            mode: mode,
            background: {
                default: mode === "light" ? "#f8f4fc" : "#333",
                paper: mode === "light" ? "#fff" : "#222",
            },
            primary: {
                main: mode === "light" ? "#071e4e" : "#fff",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Navbar text="Bye">Hello</Navbar>
                <Switch>
                    <Route path="/" exact><BlogsPage/></Route>
                    <Route path="/auth" exact><AuthenticationPage/></Route>
                    <Route path="/blogs" exact><BlogsPage/></Route>
                    <Route path="/blog/:blog_id" exact><BlogPage/></Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;