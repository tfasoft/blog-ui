import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ThemeProvider, createTheme, CssBaseline, colors as Colors} from "@mui/material";

import {useSelector, useDispatch} from "react-redux";
import {envCreate} from "./redux/actions/env";

import Navbar from "./components/navbar";

import AuthenticationPage from "./pages/authentication";
import BlogPage from "./pages/blog";
import BlogsPage from "./pages/blogs";
import HomePage from "./pages/home";
import PanelPage from "./pages/panel";

function App() {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme);

    dispatch(envCreate(process.env));

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
        components: {
            MuiPaperTable: {
                defaultProps: {
                    sx: {
                        border: "none",
                        borderRadius: 5,
                    },
                    variant: "outlined"
                }
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact><HomePage/></Route>

                    <Route path="/auth" exact><AuthenticationPage/></Route>
                    <Route path="/panel" exact><PanelPage/></Route>

                    <Route path="/blogs" exact><BlogsPage/></Route>
                    <Route path="/blog/:blog_id" exact><BlogPage/></Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;