import { render, waitFor, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";
import Users from "../Pages/Users";
import { makeServer } from "../mock/server";

let server;

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  server = makeServer({});
});

afterEach(() => {
  server.shutdown();
});

it("shows the users from our mockserver", async () => {
  const { findByText } = render(<Users />);
  await waitFor(() => findByText("Sincere@april.biz"));
  await waitFor(() => findByText("Shanna@melissa.tv"));
  await waitFor(() => findByText("Lebsackbury"));
});

it("show the user details", async () => {
  render(<Users />);

  await waitFor(() =>
    screen.getByRole("cell", {
      name: /bret/i,
    })
  );
  screen.getByRole("cell", {
    name: /leanne graham/i,
  });
  const row = screen.getByRole("row", {
    name: /bret leanne graham sincere@april\.biz romaguera\-crona gwenborough details/i,
  });

  within(row)
    .getByRole("button", {
      name: /details/i,
    })
    .click();

  screen.getByText(/multi\-layered client\-server neural\-net/i);
});
