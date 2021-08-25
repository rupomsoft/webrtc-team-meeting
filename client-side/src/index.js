import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import './assets/css/bootstrap.min.css';
import './assets/css/style.css'
import MeetingPage from "./pages/MeetingPage";
import JoinPage from "./pages/JoinPage";
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Switch>
              <Route exact path="/meet" component={MeetingPage}/>
              <Route exact path="/" component={JoinPage}/>
          </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
