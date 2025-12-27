import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Router from "../routes/Router";

describe("Router integration", () => {
  it("renders Main page on /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Router
          theme="night"
          toggleTheme={() => {}}
          active="Home"
          setActive={() => {}}
          revealKey={1}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
  });

  it("renders Project1 on /projects/1", () => {
    render(
      <MemoryRouter initialEntries={["/projects/1"]}>
        <Router
          theme="night"
          toggleTheme={() => {}}
          active="Home"
          setActive={() => {}}
          revealKey={1}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/secure enterprise office network/i)
    ).toBeInTheDocument();
  });
});
