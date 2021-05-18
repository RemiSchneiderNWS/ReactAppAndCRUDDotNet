import React, { useMemo, useState } from "react";

import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Connection from "./components/connection";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, useMediaQuery } from "@material-ui/core";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SignUpSuccess from "./components/SignUpSuccess";
import { UserContext } from "./services/context/UserContext";

function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      }),
    []
  );
  let localUser = JSON.parse(localStorage.getItem("Token") || "{}");
  const [user, setUser] = useState(localUser || null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div className="App">
      {" "}
      <UserContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          {user ? (
            <div>
              <Router>
                <Navbar />
                <header className="App-header">
                  <Route path="/" exact component={Home}></Route>
                </header>{" "}
              </Router>
            </div>
          ) : (
            <div>
              {" "}
              <Router>
                <Navbar />
                <header className="App-header">
                  <Route path="/" exact component={Home}></Route>
                  <Route
                    path="/SignUpSuccess"
                    exact
                    component={SignUpSuccess}
                  ></Route>
                  <Route path="/SignIn" exact component={SignUp}></Route>
                  <Route
                    path="/connection"
                    exact
                    component={Connection}
                  ></Route>
                </header>{" "}
              </Router>
            </div>
          )}
        </ThemeProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
