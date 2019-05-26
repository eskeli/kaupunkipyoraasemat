import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import App from "./App";
import Muuta from "./Muuta.js";
import MyAppBar from "./MyAppBar.js";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div>
        <MyAppBar />
      </div>
      <Route exact path="/" component={App} />
      <Route path="/muuta" component={Muuta} />
    </MuiPickersUtilsProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
