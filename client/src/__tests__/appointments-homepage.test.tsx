// @vitest-environment jsdom
import { describe, expect, it, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import AppointmentsHomePage from "../pages/Appointments/AppointmentsHomepage";

const mockUseGetPatientAppointmentsByDateTime = vi.fn();

vi.mock("../contexts/adminUserContext", () => ({
  useAdminUser: () => ({
    useGetPatientAppointmentsByDateTime: mockUseGetPatientAppointmentsByDateTime,
  }),
}));

vi.mock("../components/calendar", () => ({
  default: ({ setValue }: { setValue: (value: dayjs.Dayjs) => void }) => (
    <button onClick={() => setValue(dayjs("2026-02-14"))}>Pick Date</button>
  ),
}));

describe("AppointmentsHomePage", () => {
  beforeEach(() => {
    mockUseGetPatientAppointmentsByDateTime.mockReset();
  });

  it("renders appointments and filters by status", () => {
    mockUseGetPatientAppointmentsByDateTime.mockReturnValue([
      {
        _id: "a1",
        title: "General Checkup",
        status: "scheduled",
        startDate: "2026-02-13T09:00:00.000Z",
        endDate: "2026-02-13T09:30:00.000Z",
        patient: { firstName: "John", lastName: "Doe" },
        doctor: { firstName: "Alice", lastName: "Kim" },
      },
      {
        _id: "a2",
        title: "Follow Up",
        status: "completed",
        startDate: "2026-02-13T10:00:00.000Z",
        endDate: "2026-02-13T10:30:00.000Z",
        patient: { firstName: "Jane", lastName: "Ray" },
        doctor: { firstName: "Bob", lastName: "Lee" },
      },
    ]);

    render(<AppointmentsHomePage />);

    expect(screen.getByText("General Checkup")).toBeTruthy();
    expect(screen.getByText("Follow Up")).toBeTruthy();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "completed" },
    });

    expect(screen.queryByText("General Checkup")).toBeNull();
    expect(screen.getByText("Follow Up")).toBeTruthy();
  });

  it("shows empty state when there are no appointments", () => {
    mockUseGetPatientAppointmentsByDateTime.mockReturnValue([]);

    render(<AppointmentsHomePage />);

    expect(screen.getByText("No appointments found for this date.")).toBeTruthy();
  });
});
