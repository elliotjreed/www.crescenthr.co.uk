import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./../assets/scss/App.scss";

interface IState {
  loading: boolean
  posts: object,
}

export default class Sitemap extends React.Component<{}, IState> {
  private controller: AbortController;

  constructor(props: null) {
    super(props);

    this.controller = new AbortController();

    this.state = {
      loading: true,
      posts: {}
    };
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <main>
        <Helmet>
          <title>Sitemap | CrescentHR</title>
          <meta name="description" content="Sitemap for Crescent HR." />
        </Helmet>
        <section className="hero is-info is-small is-bold">
          <div className="hero-body" />
        </section>
        <div className="container home">
          <article className="articles">
            <div className="column is-10 is-offset-1">
              <div className="card article">
                <div className="card-content">
                  <div className="has-text-centered">
                    <h3 className="title article-title">Sitemap</h3>
                  </div>
                  <ul>
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
          </article>
        </div>
      </main>
    );
  }
};
