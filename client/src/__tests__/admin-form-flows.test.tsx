// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import BookAppointment from "../forms/BookAppointment";
import EditDoctorDetail from "../forms/EditDoctorDetailsForm";
import EditPatientDetailsForm from "../forms/EditPatientDetailsForm";
import DeletePatientForm from "../forms/DeletePatientForm";
import DeleteDoctor from "../forms/DeleteDoctorForm";

const mockDispatch = vi.fn();

let mockState: any = {
  doctorAndPatientUser: {
    doctors: [],
    patients: [],
  },
};

vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn(() => "test-token"),
  },
}));

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<object>("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (selector: (state: typeof mockState) => unknown) =>
      selector(mockState),
  };
});

describe("Admin form flows", () => {
  beforeEach(() => {
    mockDispatch.mockReset();
    global.fetch = vi.fn() as unknown as typeof fetch;
    mockState = {
      doctorAndPatientUser: {
        doctors: [
          {
            _id: "doctor-1",
            id: 1,
            firstName: "Alice",
            lastName: "Park",
            gender: "female",
            country: "US",
            age: 40,
            address: "10 Main",
          },
        ],
        patients: [
          {
            _id: "patient-1",
            id: 1,
            firstName: "John",
            lastName: "Doe",
            gender: "male",
            country: "US",
            age: 30,
            phoneBook: 1234567890,
            address: "22 Oak",
          },
        ],
      },
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("books an appointment successfully", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ _id: "appt-1" }),
    });

    render(<BookAppointment selectedId="doctor-1" />);

    fireEvent.change(screen.getByLabelText("Patient"), {
      target: { value: "patient-1" },
    });
    fireEvent.change(screen.getByLabelText("Start"), {
      target: { value: "2026-02-13T09:00" },
    });
    fireEvent.change(screen.getByLabelText("End"), {
      target: { value: "2026-02-13T09:30" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Book" }));

    await waitFor(() => {
      expect((global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls.length).toBe(2);
    });

    const [url, options] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url).includes("/api/admin/appointment")).toBe(true);
    expect(options.method).toBe("POST");
    expect(options.headers.Authorization).toBe("Bearer test-token");
  });

  it("shows booking error on failed request", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Slot conflict" }),
    });

    render(<BookAppointment selectedId="doctor-1" />);

    fireEvent.change(screen.getByLabelText("Patient"), {
      target: { value: "patient-1" },
    });
    fireEvent.change(screen.getByLabelText("Start"), {
      target: { value: "2026-02-13T09:00" },
    });
    fireEvent.change(screen.getByLabelText("End"), {
      target: { value: "2026-02-13T09:30" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Book" }));

    await waitFor(() => {
      expect(screen.getByText("Slot conflict")).toBeTruthy();
    });
    expect(mockDispatch.mock.calls.length).toBe(0);
  });

  it("updates doctor details successfully", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({
        _id: "doctor-1",
        firstName: "Alicia",
        lastName: "Park",
        gender: "female",
        country: "US",
        age: 40,
        address: "10 Main",
      }),
    });

    render(<EditDoctorDetail selectedId="doctor-1" />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Alicia" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    await waitFor(() => {
      expect((global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls.length).toBe(2);
    });

    const [url, options] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url).includes("/api/admin/doctor/doctor-1")).toBe(true);
    expect(options.method).toBe("PATCH");
  });

  it("shows doctor update server error", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Doctor not found" }),
    });

    render(<EditDoctorDetail selectedId="doctor-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    await waitFor(() => {
      expect(screen.getByText("Doctor not found")).toBeTruthy();
    });
    expect(mockDispatch.mock.calls.length).toBe(0);
  });

  it("updates patient details successfully", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({
        _id: "patient-1",
        firstName: "Johnny",
        lastName: "Doe",
        gender: "male",
        country: "US",
        age: 30,
        phoneBook: 1234567890,
        address: "22 Oak",
      }),
    });

    render(<EditPatientDetailsForm selectedId="patient-1" />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Johnny" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    await waitFor(() => {
      expect((global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls.length).toBe(2);
    });

    const [url, options] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url).includes("/api/admin/patient/patient-1")).toBe(true);
    expect(options.method).toBe("PATCH");
  });

  it("shows patient update server error", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Patient not found" }),
    });

    render(<EditPatientDetailsForm selectedId="patient-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    await waitFor(() => {
      expect(screen.getByText("Patient not found")).toBeTruthy();
    });
    expect(mockDispatch.mock.calls.length).toBe(0);
  });

  it("deletes patient successfully", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
    });

    render(<DeletePatientForm selectedId="patient-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect((global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls.length).toBe(2);
    });

    const [url, options] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url).includes("/api/admin/patient/patient-1/delete")).toBe(true);
    expect(options.method).toBe("DELETE");
    expect(options.headers.Authorization).toBe("Bearer test-token");
  });

  it("shows patient delete error and does not dispatch updates when delete fails", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Cannot delete patient" }),
    });

    render(<DeletePatientForm selectedId="patient-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect((global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
      expect(screen.getByText("Cannot delete patient")).toBeTruthy();
    });

    expect(mockDispatch.mock.calls.length).toBe(0);
  });

  it("deletes doctor successfully", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(<DeleteDoctor selectedId="doctor-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect((global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls.length).toBe(2);
    });

    const [url, options] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url).includes("/api/admin/doctor/doctor-1/delete")).toBe(true);
    expect(options.method).toBe("DELETE");
    expect(options.headers.Authorization).toBe("Bearer test-token");
  });

  it("shows doctor delete error and does not dispatch updates when delete fails", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Cannot delete doctor" }),
    });

    render(<DeleteDoctor selectedId="doctor-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect((global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
      expect(screen.getByText("Cannot delete doctor")).toBeTruthy();
    });

    expect(mockDispatch.mock.calls.length).toBe(0);
  });
});
