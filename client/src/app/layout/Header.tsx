import { Box, AppBar, Toolbar, Switch, Typography, Badge, Button, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedinMenu from "./SignedinMenu";

const midLinks = [
  // { title: "Home", path: "/" },
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header(props: any) {

  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector(state => state.basket)
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ direction: "row", justifyContent: "space-between", alignItems: "center" }}>

          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <Switch defaultChecked onChange={props.handleMode} color="default" />

            <IconButton component={Link} to="/" sx={{ flexGrow: 1 }} >
              TV Direct
            </IconButton>
          </Box>

          <List sx={{ display: 'flex' }}>
            {midLinks.map(({ title, path }) => (
              <ListItem key={title} component={NavLink} to={path} sx={navStyles}>{title}</ListItem>
            ))}

            {user && user.roles?.includes('Admin') && (
              <ListItem component={NavLink} to={"/inventory"} sx={navStyles}>
                INVENTORY
              </ListItem>
            )}
          </List>

          <Box sx={{ display: 'flex' }}>
            <IconButton size="large" component={Link} to='/basket'>
              <Badge color="secondary" badgeContent={itemCount}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <SignedinMenu />
            ) : (
              <List sx={{ display: "flex" }}>
                {rightLinks.map(({ title, path }) =>
                (
                  <ListItem component={NavLink} to={path} key={path} sx={{ color: "inherit" }}>
                    {title.toUpperCase()}
                  </ListItem>
                ))}                 
              </List>


            )}

            {/* <List sx={{ display: 'flex' }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem key={title} component={NavLink} to={path} sx={navStyles}>
                  {title}
                </ListItem>
              ))}
            </List> */}

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );

}
