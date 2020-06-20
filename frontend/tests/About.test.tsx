import { shallow } from "enzyme";
import * as React from "react";
import About from "../src/components/About";

describe("About", (): void => {
  it("should render with main-content CSS class and contain title text", (): void => {
    expect(shallow(<About />).exists(".main-content")).toBe(true);
    expect(shallow(<About />).text()).toContain("What we do");
  });
});
