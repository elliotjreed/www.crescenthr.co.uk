import { shallow } from "enzyme";
import * as React from "react";
import Footer from "../src/components/Footer";

describe("Footer", (): void => {
  it("should render with footer CSS class and contain copyright owner text", (): void => {
    expect(shallow(<Footer />).exists(".footer")).toBe(true);
    expect(shallow(<Footer />).text()).toContain("Crescent HR");
  });
});
