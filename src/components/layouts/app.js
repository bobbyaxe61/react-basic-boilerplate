import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { storeInstance } from "../../support/reducerSupport";
import { retrievePersistedLastLogin } from "../../support/sessionSupport";
import { AUTH_LOGIN_USER } from "../../redux/actions/types";
import Alerts from "../includes/alerts";
import Landing from "../pages/landing";
import Missing from "../pages/missing";
import Footer from "../includes/footer";
import TopNavBar from "../navigation/topNavBar";
import ApplicationStatusModal from "../modals/applicationStatusModal";

const App = () => {
  // Get last login details, if any re-login user
  let user = retrievePersistedLastLogin("session");
  if (user) {
    storeInstance().dispatch((dispatch) => {
      dispatch({ type: AUTH_LOGIN_USER, payLoad: user.loginDetails });
    });
  }
  return (
    <Provider store={storeInstance()}>
      <Router>
        <Alerts />
        <TopNavBar />
        <ApplicationStatusModal />
        <Switch>
          {/* Landing page*/}
          <Route exact path="/" component={Landing} />

          {/* Not found page */}
          <Route path="*" component={Missing} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
