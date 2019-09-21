import * as React from "react";

export default class Footer extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            &copy; {new Date().getFullYear()} <em>Crescent HR</em>
          </p>
        </div>
      </footer>
    );
  }
}
