import { useState } from "react";
import * as React from "react";
import { Helmet } from "react-helmet";

import "./../assets/scss/App.scss";
import Spinner from "./Spinner";

const renderSuccess: JSX.Element = (
  <div className="notification is-primary">
    Thank you for your enquiry. We will get back to you via your preferred contact method shortly.
  </div>
);

const Contact = (): JSX.Element => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccessful] = useState(false);

  const handleSubmit = (event): void => {
    event.preventDefault();
    setLoading(true);
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
          setSuccessful(true);
        } else {
          setError(json as string);
        }
        setLoading(true);
      })
      .catch(() => setError("There was an error sending your email, please try again or contact us via"));
  };

  const renderForm: JSX.Element = (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <div className="control">
          <input id="name" className="input" type="text" placeholder="Name&hellip;" name="name" disabled={loading} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <div className="control">
          <input
            id="email"
            className="input"
            type="email"
            placeholder="Email address&hellip;"
            name="email"
            disabled={loading}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="phone" className="label">
          Telephone
        </label>
        <div className="control">
          <input
            id="phone"
            className="input"
            type="tel"
            placeholder="Telephone number &hellip;"
            name="phone"
            disabled={loading}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="message" className="label">
          Message
        </label>
        <div className="control">
          <textarea id="message" className="textarea" placeholder="Enquiry&hellip;" name="message" disabled={loading} />
        </div>
      </div>
      <p className="label">Preferred contact method</p>
      <div className="field">
        <div className="control">
          <label className="radio">
            <input type="radio" name="preferredMethod" value="email" disabled={loading} /> Email
          </label>
          <label className="radio">
            <input type="radio" name="preferredMethod" value="phone" disabled={loading} /> Telephone
          </label>
        </div>
      </div>
      <div className="field">
        <div className="control ">
          <button className="button submit-button" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <>
      <Helmet>
        <title>Contact | Crescent HR</title>
        <meta name="description" content="Contact Crescent HR for information, fees, and availability." />
      </Helmet>

      <main className="main-content">
        <div className="section-dark resume">
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-12 about-me">
                <h2 className="title has-text-centered section-title">Get in Touch</h2>
              </div>
              <div className="column is-8 is-offset-2">{success ? renderSuccess : renderForm}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
