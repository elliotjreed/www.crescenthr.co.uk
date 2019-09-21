import * as React from "react";
import * as ReactGA from "react-ga";
import {Helmet} from "react-helmet";

import "./../assets/scss/App.scss";

export default class Home extends React.Component<{}, {}> {
  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);
  }

  public render(): React.ReactNode {
    return (
      <>
        <Helmet>
          <title>Human Resources Consultancy in Nottinghamshire | CrescentHR</title>
          <meta name="description" content="Crescent HR is Emma Sansom's Human Resources consultancy based in Nottinghamshire."/>
        </Helmet>

        <main className="main-content">
          <div className="section-dark resume">
            <div className="container">
              <div
                className="columns is-multiline"
                data-aos="fade-in"
                data-aos-easing="linear"
              >
                <div className="column is-12 about-me">
                  <h2 className="title has-text-centered section-title">
                    Welcome to Crescent HR
                  </h2>
                </div>
                <div className="column is-10 has-text-centered is-offset-1">
                  <h3 className="subtitle">
                    We're passionate about people!
                  </h3>
                  <p>
                    Crescent offer a personable and practical approach to human resource consultancy, working with businesses to build relationships and offering a tailored service.
                  </p>
                  <p>
                    Our core clients are SME sized businesses who often don't have a HR function of their own or have small HR departments which require specialist help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
