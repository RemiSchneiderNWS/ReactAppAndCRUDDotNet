import React, { useContext, useState } from "react";

import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { login } from "../../services/AuthServices";
import User from "../../models/User";

import { UserContext } from "../../services/context/UserContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(5),

        width: "25ch",
      },
    },
    input: {
      color: "white",
      PaddingBottom: "0",
    },
    error: {
      color: "red",
      fontSize: "15px",
      width: "50%",
      display: "flex",
      margin: "auto",
    },
    center: {
      display: "flex",
      margin: "auto",
      marginTop: "50px",
    },
    border: {
      border: "solid 1px",
      borderRadius: "30px",
      paddingBottom: "50px",
    },
    errorFrame: {
      color: "red",
      display: "flex",
      margin: "2%",
    },
  })
);

export default function Connection() {
  const [Status, setStatus] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const history = useHistory();
  const onSubmit = (data: any) => {
    const user: User = { email: data.mail, password: data.Password };
    login(user).then((userIdentificated) => {
      if (userIdentificated.status === 404) {
        setStatus(false);
        return;
      }
      console.log(userIdentificated);
      setStatus(true);
      localStorage.setItem("Token", JSON.stringify(userIdentificated));

      setUser(userIdentificated);
    });
    history.push("/");
  };
  return (
    <div>
      {Status === false ? (
        <div className={classes.errorFrame}>
          Incorrect username or password.
        </div>
      ) : null}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.root}
        noValidate
      >
        <div className={classes.border}>
          <h2 style={{ marginLeft: "5%" }}>Sign in to App</h2>
          <div>
            <TextField
              {...register("mail", { required: true })}
              name="mail"
              id="email"
              label="Username"
              className={classes.input}
            />
          </div>

          {errors.mail && (
            <span className={classes.error}>This field is required</span>
          )}
          <div>
            <TextField
              {...register("Password", { required: true })}
              id="standard-password-input"
              name="Password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>

          {errors.Password && (
            <span className={classes.error}>This field is required</span>
          )}
          <Button className={classes.center} variant="contained" type="submit">
            Sign in{" "}
          </Button>
        </div>
      </form>
    </div>
  );
}
