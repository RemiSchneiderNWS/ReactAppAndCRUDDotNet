import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { UserContext } from "../services/context/UserContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const handleLoginButton = () => {
    history.push("/connection");
  };
  const handleSignInButton = () => {
    history.push("/SignIn");
  };
  console.log(user);
  const classes = useStyles();

  const handleDisconnect = () => {
    setUser(null);
    localStorage.clear();
    history.push("/");
  };

  if (user) {
    return (
      <div className={classes.root}>
        <AppBar style={{ background: "#2E3B55" }} position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              CRUD Application
            </Typography>
            <Typography variant="h6">{user.mail}</Typography>
            <Button color="inherit" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "#2E3B55" }} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CRUD Application
          </Typography>
          <Button color="inherit" onClick={handleLoginButton}>
            Login
          </Button>
          <Button color="inherit" onClick={handleSignInButton}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
