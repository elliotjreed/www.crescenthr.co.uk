import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./../assets/scss/App.scss";

const Sitemap = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Sitemap | CrescentHR</title>
        <meta name="description" content="Sitemap for Crescent HR." />
      </Helmet>

      <main className="main-content">
        <div className="section-dark resume">
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-12 about-me">
                <h2 className="title has-text-centered section-title">Sitemap</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Sitemap;
