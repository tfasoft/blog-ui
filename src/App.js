import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ThemeProvider, createTheme, CssBaseline, colors as Colors} from "@mui/material";

import Navbar from "./components/navbar";

import AuthenticationPage from "./pages/authentication";
import BlogPage from "./pages/blog";
import BlogsPage from "./pages/blogs";
import HomePage from "./pages/home";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: Colors.red[900],
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Navbar text="Bye">Hello</Navbar>
                <Switch>
                    <Route path="/" exact><HomePage /></Route>
                    <Route path="/auth" exact><AuthenticationPage/></Route>
                    <Route path="/blogs" exact><BlogsPage/></Route>
                    <Route path="/blog/:blogid" exact><BlogPage/></Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;