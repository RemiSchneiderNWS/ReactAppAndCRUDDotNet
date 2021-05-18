import React from "react";
import { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import User from "../models/User";
import { Register } from "../services/AuthServices";
import { servicesVersion } from "typescript";
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
  })
);

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const history = useHistory();
  const onSubmit = (data: any) => {
    console.log("data : " + data);
    const user: User = { email: data.mail, password: data.Password };
    Register(user).then((user) => {
      history.push("/SignUpSuccess");
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate>
      <div className={classes.border}>
        <h2 style={{ marginLeft: "5%" }}>Create your account</h2>
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
          Sign Up{" "}
        </Button>
      </div>
    </form>
  );
}
