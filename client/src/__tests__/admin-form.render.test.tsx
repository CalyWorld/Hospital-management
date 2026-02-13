// @vitest-environment jsdom
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import AdminForm from "../forms/AdminForm";

const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<object>("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe("AdminForm rendering and flow", () => {
  beforeEach(() => {
    mockDispatch.mockReset();
    global.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders admin login form fields", () => {
    render(<AdminForm />);

    expect(screen.getByText("Login Admin")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter Username")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter Password")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeTruthy();
  });

  it("shows validation messages for empty submit", async () => {
    render(<AdminForm />);

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeTruthy();
      expect(
        screen.getByText("Password must be at least 4 characters"),
      ).toBeTruthy();
    });
  });

  it("submits credentials and dispatches admin/token actions", async () => {
    const mockUser = { token: "jwt-token", admin: { id: "1", username: "admin" } };

    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    });

    render(<AdminForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect((global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls.length).toBe(2);
    });

    const [url, options] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url).includes("/api/admin/login")).toBe(true);
    expect(options.method).toBe("POST");
    expect(options.credentials).toBe("include");
  });
});
