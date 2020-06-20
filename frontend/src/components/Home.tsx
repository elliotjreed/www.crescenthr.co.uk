import * as React from "react";
import { Helmet } from "react-helmet";

import "./../assets/scss/App.scss";

const Home = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Human Resources Consultancy in Nottinghamshire | Crescent HR</title>
        <meta
          name="description"
          content="Crescent HR is Emma Sansom’s Human Resources consultancy based in Nottinghamshire."
        />
      </Helmet>

      <main className="main-content">
        <div className="section-dark resume">
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-12 about-me">
                <h2 className="title has-text-centered section-title">Welcome to Crescent HR</h2>
                <h3 className="subtitle has-text-centered">We’re passionate about people!</h3>
              </div>
            </div>
            <div className="columns">
              <div className="column is-2 is-offset-1">
                <figure className="image">
                  <img
                    className="is-rounded"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/v1570202320/crescenthr/emma.jpg"
                    alt="Photograph of Emma Sansom"
                  />
                </figure>
              </div>
              <div className="column is-8 has-text-left">
                <p>
                  Crescent offer a personable and practical approach to human resource consultancy, working with
                  businesses to build relationships and offering a tailored service.
                </p>
                <hr />
                <p>
                  Our core clients are SME sized businesses who often don’t have a HR function of their own or have
                  small HR departments which require specialist help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
