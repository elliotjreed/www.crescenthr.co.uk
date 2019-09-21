import * as React from "react";
import { Helmet } from "react-helmet";

import "./../assets/scss/App.scss";
import Spinner from "./Spinner";

interface IState {
  error: string;
  loading: boolean;
  success: boolean;
}

export default class Contact extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      loading: false,
      success: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <>
        <Helmet>
          <title>Contact | Crescent HR</title>
          <meta name="description" content="Contact Crescent HR for information, fees, and availability."/>
        </Helmet>

        <main className="main-content">
          <div className="section-dark resume">
            <div className="container">
              <div className="columns is-multiline">
                <div className="column is-12 about-me">
                  <h2 className="title has-text-centered section-title">
                    Get in Touch
                  </h2>
                </div>
                <div className="column is-8 is-offset-2">
                  {this.state.success ? this.renderSuccess() : this.renderForm()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  private renderSuccess(): React.ReactNode {
    return (
      <div className="notification is-primary">
        Thank you for your enquiry. We will get back to you via your preferred contact method shortly.
      </div>
    )
  }

  private renderForm(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="name" className="label">Name</label>
          <div className="control">
            <input
              id="name"
              className="input"
              type="text"
              placeholder="Name&hellip;"
              name="name"
              disabled={this.state.loading}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="email" className="label">Email</label>
          <div className="control">
            <input
              id="email"
              className="input"
              type="email"
              placeholder="Email address&hellip;"
              name="email"
              disabled={this.state.loading}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="phone" className="label">Telephone</label>
          <div className="control">
            <input
              id="phone"
              className="input"
              type="tel"
              placeholder="Telephone number &hellip;"
              name="phone"
              disabled={this.state.loading}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="message" className="label">Message</label>
          <div className="control">
            <textarea
              id="message"
              className="textarea"
              placeholder="Enquiry&hellip;"
              name="message"
              disabled={this.state.loading}
            />
          </div>
        </div>
        <p className="label">Preferred contact method</p>
        <div className="field">
          <div className="control">
            <label className="radio">
              <input type="radio" name="preferredMethod" value="email" disabled={this.state.loading} /> Email
            </label>
            <label className="radio">
              <input type="radio" name="preferredMethod" value="phone" disabled={this.state.loading} /> Telephone
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control ">
            <button className="button submit-button" disabled={this.state.loading}>
              {this.state.loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </div>
      </form>
    );
  }

  private handleSubmit(event): void {
    event.preventDefault();
    this.setState({ loading: true });
    fetch("https://api.crescenthr.co.uk", {
      body: new URLSearchParams(new FormData(event.target) as any),
      method: "POST"
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response: Response) => response.json())
      .then((json: string | boolean) => {
        if (json === true) {
          this.setState({ success: true });
        } else {
          this.setState({ error: (json as string) });
        }
        this.setState({ loading: true });
      })
      .catch(() => this.setState({ error: "There was an error sending your email, please try again or contact us via" }));
  }
}
