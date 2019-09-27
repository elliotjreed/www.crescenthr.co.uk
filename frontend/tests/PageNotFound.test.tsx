import { shallow } from "enzyme";
import * as React from "react";
import PageNotFound from "../src/components/PageNotFound";

describe("PageNotFound", (): void => {
  it("should render with main-content CSS class and contain Page Not Found text", (): void => {
    expect(shallow(<PageNotFound />).exists(".main-content")).toBe(true);
    expect(shallow(<PageNotFound />).text()).toContain("Page Not Found");
  });
});
