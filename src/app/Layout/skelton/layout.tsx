import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Layout = ({ children }: any) => {
    const history = useNavigate();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (text: string, path: string) => {
        history(path);
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <h3>My App</h3>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                anchor="left"
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                onClick={handleDrawerClose}
            >
                <Toolbar>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List>
                    {[
                        { text: "Workers", path: "/workers" },
                    ].map((item, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => handleListItemClick(item.text, item.path)}
                        >
                            <ListItemIcon>
                                <MenuIcon />
                            </ListItemIcon>

                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Toolbar />
            {children}
        </>
    );
};

export default Layout;

