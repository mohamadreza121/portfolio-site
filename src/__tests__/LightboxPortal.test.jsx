import { render } from "@testing-library/react";
import LightboxPortal from "../components/LightboxPortal";

describe("LightboxPortal", () => {
  it("renders children into document body", () => {
    const { container } = render(
      <LightboxPortal>
        <div data-testid="portal-content">Portal Content</div>
      </LightboxPortal>
    );

    expect(
      document.body.querySelector('[data-testid="portal-content"]')
    ).toBeTruthy();
  });
});
