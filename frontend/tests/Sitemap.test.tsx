import { shallow } from "enzyme";
import * as React from "react";
import { Link } from "react-router-dom";
import Sitemap from "../src/components/Sitemap";

describe("Sitemap", (): void => {
  it("should render with main-content CSS class and contain welcome text", (): void => {
    expect(shallow(<Sitemap />).exists(".main-content")).toBe(true);
    expect(shallow(<Sitemap />).text()).toContain("Sitemap");
    expect(shallow(<Sitemap />).find(Link)).toHaveLength(3);
  });
});
