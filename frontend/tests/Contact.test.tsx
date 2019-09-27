import { shallow } from "enzyme";
import * as React from "react";
import Contact from "../src/components/Contact";

describe("Contact", (): void => {
  it("should render with input field CSS class and contain title text", (): void => {
    expect(shallow(<Contact />).exists(".field")).toBe(true);
    expect(shallow(<Contact />).text()).toContain("Get in Touch");
  });
});
