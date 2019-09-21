import * as React from "react";

import AOS from "aos";
import "./../assets/scss/App.scss";
import Routes from "./Routes";

AOS.init();

export default class App extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <>
        <Routes/>
      </>
    );
  }
}
