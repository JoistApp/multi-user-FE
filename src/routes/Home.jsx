import useAuthenticate from "../hooks/useAuthenticate";
import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import { selectUserTabs } from "../features/selectors/userSelector";

export default function Home() {
  useAuthenticate();
  const tabs = useSelector(selectUserTabs);

  if (!tabs) {
    return <></>;
  }

  return (
    <div>
      <Drawer
        sx={{
          width: '150px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '150px',
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {tabs.map(({name}) => (
            <ListItem key={name} disablePadding>
              <Link style={{
                textDecoration: 'none',
                color: 'black',
                width: '100%',
              }} to={name}>
                <ListItemButton>
                    <ListItemText primary={name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Box sx={{ marginLeft: '150px', padding: 3 }}>
        <Outlet />
      </Box>
    </div>
  );
};