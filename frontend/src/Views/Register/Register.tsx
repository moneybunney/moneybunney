import {
  Avatar,
  createStyles,
  CssBaseline,
  LinearProgress,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { post } from "../../Utilities/Http";
import RegistrationForm from "./RegistrationForm";

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    formContainer: {
      marginTop: theme.spacing.unit * 8,
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.primary.main,
    },
  });

interface IProps extends WithStyles<typeof styles> {}

function Register({ classes, history }: IProps & RouteComponentProps<any>) {
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  const onSubmit = (email: string, password: string) => {
    setEmailError(false);
    setLoading(true);

    post("/user", {
      username: email,
      password,
    }).then(response => {
      if (response.status === 201) {
        history.replace("/");
      } else {
        setEmailError(true);
      }
      setLoading(false);
    });
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <div className={classes.formContainer}>
        {loading && <LinearProgress />}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <RegistrationForm
            loading={loading}
            emailError={emailError}
            onSubmit={onSubmit}
          />
        </Paper>
      </div>
    </main>
  );
}

export default withRouter(withStyles(styles)(Register));
