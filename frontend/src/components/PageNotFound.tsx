import * as React from "react";

import "./../assets/scss/App.scss";

const PageNotFound = (): JSX.Element => {
  return (
    <main className="main-content">
      <div className="section-dark resume">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-12 about-me">
              <h2 className="title has-text-centered section-title">Page Not Found</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
