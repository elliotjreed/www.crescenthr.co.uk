import * as React from "react";
import { Link } from "react-router-dom";

interface IState {
  menuActive: boolean;
}

export default class TopBar extends React.Component<{}, IState> {
  constructor(props: null) {
    super(props);

    this.state = {
      menuActive: false
    };

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <div className="header-wrapper" id="home">
        <section className="hero">
          <nav className="navbar is-transparent is-hidden-desktop">
            <a className="navbar-brand">
              <div data-target="mobile-nav" role="button" className={"navbar-burger burger navbar" + (this.state.menuActive ? " is-active" : "")} aria-label="menu" aria-expanded="false" onClick={this.toggleMobileMenu}>
                <span/>
                <span/>
                <span/>
              </div>
            </a>
            <div id="mobile-nav" className={"navbar-menu" + (this.state.menuActive ? " is-active" : "")}>
              <div className="navbar-end">
                <div className="navbar-item">
                  <Link to="/" className="navbar-item">
                    Home
                  </Link>
                </div>
                <div className="navbar-item">
                  <Link to="/about" className="navbar-item">
                    About
                  </Link>
                </div>
                <div className="navbar-item">
                  <Link to="/contact" className="navbar-item">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <div className="hero-body">
            <h1 className="image has-text-centered">
              <img src="https://res.cloudinary.com/elliotjreed/image/upload/v1568570548/crescenthr/logo-banner.png"
                   title="Crescent HR" alt="The logo for Crescent HR"/>
            </h1>
          </div>
          <div className="hero-foot">
            <div className="hero-foot--wrapper">
              <div className="columns">
                <div className="column is-12 hero-menu-desktop has-text-centered">
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
        </section>
      </div>
    );
  }

  private toggleMobileMenu(): void {
    const currentMenuActive = this.state.menuActive;

    this.setState({ menuActive: !currentMenuActive });
  }
}
