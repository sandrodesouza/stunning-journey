import { render, waitFor, screen } from "@testing-library/react";
import { fireEvent, waitForElementToBeRemoved } from "@testing-library/dom";
import { makeServer } from "../mock/server";
import Tasks from "../Pages/Tasks";
import "@testing-library/jest-dom";

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

it("shows the tasks from our mockserver", async () => {
  render(<Tasks />);

  screen.getByRole("heading", {
    name: /tasks/i,
  });
  await waitFor(() =>
    screen.getByRole("cell", {
      name: /delectus aut autem/i,
    })
  );
});

it("shows the tasks from our mockserver page 2", async () => {
  render(<Tasks />);

  await waitFor(() =>
    screen
      .getByRole("button", {
        name: /right/i,
      })
      .click()
  );
  await waitFor(() =>
    screen.getByRole("cell", {
      name: /19/i,
    })
  );

  await waitFor(() =>
    screen.getByRole("cell", {
      name: /molestiae ipsa aut voluptatibus pariatur dolor nihil/i,
    })
  );
});

it("search task by title", async () => {
  render(<Tasks />);

  await waitFor(() =>
    screen.getByRole("cell", {
      name: /quis ut nam facilis et officia qui/i,
    })
  );
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "quis" } });
  screen
    .getByRole("button", {
      name: /search/i,
    })
    .click();

  await waitForElementToBeRemoved(
    () =>
      screen.queryByRole("cell", {
        name: /delectus aut autem/i,
      }),
    { timeout: 10000 }
  );

  await waitFor(() =>
    expect(
      screen.queryByRole("cell", {
        name: /delectus aut autem/i,
      })
    ).not.toBeInTheDocument()
  );

  screen.getByRole("cell", {
    name: /cum debitis quis accusamus doloremque ipsa natus sapiente omnis/i,
  });
});
