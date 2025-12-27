import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Main from "../pages/Main";

describe("Main page integration", () => {
  it("renders all major sections", () => {
    render(
      <MemoryRouter>
        <Main setActive={() => {}} revealKey={1} />
      </MemoryRouter>
    );

    expect(screen.getByText(/about me/i)).toBeInTheDocument();
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
    expect(screen.getByText(/certifications/i)).toBeInTheDocument();
    expect(screen.getByText(/services/i)).toBeInTheDocument();
  });

  it("renders spy markers for scroll spy", () => {
    render(
      <MemoryRouter>
        <Main setActive={() => {}} revealKey={1} />
      </MemoryRouter>
    );

    const markers = document.querySelectorAll(".spy-marker");
    expect(markers.length).toBeGreaterThan(0);
  });
});
