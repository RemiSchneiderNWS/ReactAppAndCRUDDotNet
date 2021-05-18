import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      display: "flex",
      margin: "auto",
      marginTop: "50px",
    },
  })
);

export default function SignUpSuccess() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <div style={{ color: "green" }}>
        Your account has been created successfully{" "}
      </div>

      <Button
        className={classes.center}
        onClick={() => {
          history.push("/SignIn");
        }}
        variant="contained"
        type="submit"
      >
        Sign Up{" "}
      </Button>
    </div>
  );
}
