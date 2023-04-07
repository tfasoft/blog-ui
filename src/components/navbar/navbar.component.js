import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Drawer,
} from "@mui/material";

import {
  Menu,
  Logout,
  Login,
  Dashboard,
  Home,
  MenuBook,
  Biotech,
  RssFeed,
  Create,
} from "@mui/icons-material";

import { unsetUser } from "@/redux/actions/user";
import { unsetToken } from "@/redux/actions/token";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const session = useSelector((state) => state.token);

  const navItems = [
    {
      name: "TFASoft",
      href: "https://tfasoft.amirhossein.info",
      icon: <Home />,
    },
    {
      name: "Dashboard",
      href: "https://dashboard.amirhossein.info",
      icon: <Dashboard />,
    },
    {
      name: "Docs",
      href: "https://docs.amirhossein.info",
      icon: <MenuBook />,
    },
    {
      name: "Demo",
      href: "https://demo.amirhossein.info",
      icon: <Biotech />,
    },
  ];

  const drawer = (
    <Box
      onClick={() => setDrawerOpen(!drawerOpen)}
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        onClick={() => router.push("/")}
        sx={{
          cursor: "pointer",
          my: 2,
        }}
      >
        TFASoft Blog
      </Typography>
      <Divider />
      <List>
        {session && (
          <Box>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/panel")}>
                <ListItemIcon sx={{ color: "primary.main" }}>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Panel" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/blogs/new")}>
                <ListItemIcon sx={{ color: "primary.main" }}>
                  <Create />
                </ListItemIcon>
                <ListItemText primary="New blog" />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/blogs")}>
            <ListItemIcon sx={{ color: "primary.main" }}>
              <RssFeed />
            </ListItemIcon>
            <ListItemText primary="Blogs" />
          </ListItemButton>
        </ListItem>
        {session ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(unsetToken());
                dispatch(unsetUser());
              }}
            >
              <ListItemIcon sx={{ color: "primary.main" }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/auth")}>
              <ListItemIcon sx={{ color: "primary.main" }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {navItems.map((item) => {
          return (
            <ListItem disablePadding>
              <ListItemButton component="a" href={item.href}>
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar elevation={0}>
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{
                mr: 2,
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              onClick={() => router.push("/")}
              sx={{
                cursor: "pointer",
                flexGrow: 1,
              }}
            >
              TFASoft Blog
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              {session && (
                <Button
                  variant="text"
                  onClick={() => router.push("/panel")}
                  sx={{
                    color: "white",
                  }}
                >
                  Panel
                </Button>
              )}
              {session && (
                <Button
                  variant="text"
                  onClick={() => router.push("/blogs/new")}
                  sx={{
                    color: "white",
                  }}
                >
                  New Blog
                </Button>
              )}
              <Button
                variant="text"
                onClick={() => router.push("/blogs")}
                sx={{
                  color: "white",
                }}
              >
                Blogs
              </Button>
              {session ? (
                <Button
                  variant="text"
                  onClick={() => {
                    dispatch(unsetToken());
                    dispatch(unsetUser());
                  }}
                  sx={{
                    color: "white",
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="text"
                  onClick={() => router.push("/auth")}
                  sx={{
                    color: "white",
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            },
          }}
        >
          <Box>{drawer}</Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
