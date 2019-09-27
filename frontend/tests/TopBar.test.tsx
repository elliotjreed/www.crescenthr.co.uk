import { shallow } from "enzyme";
import * as React from "react";
import { Link } from "react-router-dom";
import TopBar from "../src/components/TopBar";

describe("TopBar", (): void => {
  it("should render with navbar CSS class and contain links", (): void => {
    expect(shallow(<TopBar />).exists(".navbar")).toBe(true);
    expect(shallow(<TopBar />).find(Link)).toHaveLength(6);
  });
});
