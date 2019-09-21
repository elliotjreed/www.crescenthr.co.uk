import * as React from "react";
import {Helmet} from "react-helmet";

import "./../assets/scss/App.scss";

export default class About extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <>
        <Helmet>
          <title>About | Crescent HR</title>
          <meta name="description" content="Find out more about the services Crescent HR can offer your business."/>
        </Helmet>

        <main className="main-content">
          <div className="section-dark resume">
            <div className="container">
              <div className="columns is-multiline">
                <div className="column is-12 about-me">
                  <h2 className="title has-text-centered section-title">
                    What we do
                  </h2>
                </div>
                <div className="column 5 is-offset-1">
                  <p>
                    We offer a full range of HR assistance with the flexibility of an <em>ad hoc</em> service where you have the option of contacting us as and when you need us. The cost of this service is agreed upon application and will be invoiced monthly.
                  </p>
                </div>
                <div className="column 5 is-offset-1">
                  <p>
                    We also offer a monthly retainer service where you can have the option of paying a monthly fee and have the safety of knowing expert advice is only a phone call away.
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
