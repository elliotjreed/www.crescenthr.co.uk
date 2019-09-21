import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactGA from "react-ga";
import { Route, Router, Switch } from "react-router-dom";

import "./../assets/scss/App.scss";
import Footer from "./Footer";
import Spinner from "./Spinner";
import TopBar from "./TopBar";

const About = React.lazy(() => import(/* webpackChunkName: "about" */ "./About"));
const Contact = React.lazy(() => import(/* webpackChunkName: "contact" */ "./Contact"));
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ "./Home"));
const PageNotFound = React.lazy(() => import(/* webpackChunkName: "pagenotfound" */ "./PageNotFound"));
const Sitemap = React.lazy(() => import(/* webpackChunkName: "sitemap" */ "./Sitemap"));

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
});


export default class Routes extends React.Component<{}, {}> {
  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);
  }

  public render(): Router {
    return (
      <Router history={history}>
        <TopBar/>
        <React.Suspense fallback={<Spinner/>}>
          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/about" component={About}/>
            <Route exact={true} path="/contact" component={Contact}/>
            <Route exact={true} path="/sitemap" component={Sitemap}/>
            <Route component={PageNotFound}/>
          </Switch>
        </React.Suspense>
        <Footer/>
      </Router>
    );
  }
}
