import useAuthenticate from "../hooks/useAuthenticate";
import { Outlet, Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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
              <ListItemButton>
                <Link to={name}>
                  <ListItemText primary={name} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Outlet />
    </div>
  );
};