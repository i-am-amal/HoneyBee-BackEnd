import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "@fontsource/montez";
import { Clear_user } from "../../features/users/AuthReducer";
import { useEffect } from "react";
import { ClearUserData, SetUserData } from "../../features/users/UserReducer";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import { userDataApi } from "../../services/api";
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);


  useEffect(() => {
    userDataApi()
      .then((res) => {
        if (res.data) {
          dispatch(SetUserData(res.data));
        } else {
          dispatch(ClearUserData());
          dispatch(Clear_user());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  const logoutHandler = () => {
    localStorage.removeItem("authorization.user");
    dispatch(ClearUserData());
    dispatch(Clear_user());
    navigate("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const SideBarItems = ["Discover","LikedUsers", "Matches", "Chat", "Search", "HoneyVip"];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Grid container>
            <Grid
              onClick={() => navigate("/")}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              item
              xs={5}
            >
              <FavoriteIcon
                sx={{ cursor: "pointer", display: { md: "flex" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  cursor: "pointer",
                  mr: 2,
                  display: { xs: "flex", md: "flex" },
                  fontFamily: "Montez",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                HoneyBee
              </Typography>
            </Grid>

            <Grid item xs={6}></Grid>

            <Grid item xs={1}>
              {user && (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
          <Menu
  id="menu-appbar"
  anchorEl={anchorEl}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  keepMounted
  transformOrigin={{
    vertical: "top",
    horizontal: "left",
  }}
  open={Boolean(anchorEl)}
  onClose={handleClose}
  style={{ width: "100%", maxWidth: "100%" }}
>
  {SideBarItems.map((item) => {
    return (
      <MenuItem key={item}  sx={{display:{xs:"block",lg:"none"}}} onClick={() => navigate(`/${item}`)}>
        {item}
      </MenuItem>
    );
  })}
  <MenuItem onClick={() => navigate("/profile")}>
    <Person2Icon sx={{ marginRight: "0.75rem" }} />
    Profile
  </MenuItem>
  <MenuItem onClick={logoutHandler}>
    <LogoutIcon sx={{ marginRight: "0.75rem" }} />
    Logout
  </MenuItem>
</Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
