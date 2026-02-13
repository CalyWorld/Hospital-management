// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import dayjs from "dayjs";
import AdminDashBoard from "../pages/Admin/AdminDashBoard";

const mockUseGetPatientAppointmentsByDateTime = vi.fn();

vi.mock("../contexts/adminUserContext", () => ({
  useAdminUser: () => ({
    useGetPatientAppointmentsByDateTime: mockUseGetPatientAppointmentsByDateTime,
  }),
}));

const now = new Date();
const todayStart = new Date(now);
todayStart.setHours(0, 0, 0, 0);
const todayEnd = new Date(now);
todayEnd.setHours(23, 59, 59, 999);

const mockState = {
  doctorAndPatientUser: {
    doctors: [
      {
        _id: "d1",
        firstName: "Ana",
        lastName: "Park",
        startDate: todayStart.toISOString(),
        endDate: todayEnd.toISOString(),
      },
    ],
    patients: [{ _id: "p1" }, { _id: "p2" }],
  },
};

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<object>("react-redux");
  return {
    ...actual,
    useSelector: (selector: (state: typeof mockState) => unknown) =>
      selector(mockState),
  };
});

vi.mock("../components/calendar", () => ({
  default: ({ setValue }: { setValue: (value: dayjs.Dayjs) => void }) => (
    <button onClick={() => setValue(dayjs("2026-02-14"))}>Pick Date</button>
  ),
}));

describe("AdminDashBoard P1", () => {
  it("shows appointment count and date panel appointments", () => {
    mockUseGetPatientAppointmentsByDateTime.mockReturnValue([
      {
        _id: "a1",
        title: "Checkup",
        status: "scheduled",
        startDate: "2026-02-13T09:00:00.000Z",
        endDate: "2026-02-13T09:30:00.000Z",
        patient: { firstName: "John", lastName: "Doe" },
        doctor: { firstName: "Ana", lastName: "Park" },
      },
      {
        _id: "a2",
        title: "Follow-up",
        status: "scheduled",
        startDate: "2026-02-13T10:00:00.000Z",
        endDate: "2026-02-13T10:20:00.000Z",
        patient: { firstName: "Jane", lastName: "Ray" },
        doctor: { firstName: "Ana", lastName: "Park" },
      },
    ]);

    render(
      <MemoryRouter initialEntries={["/admin/dashboard"]}>
        <AdminDashBoard />
      </MemoryRouter>,
    );

    expect(screen.getByText("Appointments")).toBeTruthy();
    expect(screen.getByText("2 Appointments")).toBeTruthy();
    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("Jane Ray")).toBeTruthy();
  });

  it("shows empty message for no appointments", () => {
    mockUseGetPatientAppointmentsByDateTime.mockReturnValue([]);

    render(
      <MemoryRouter initialEntries={["/admin/dashboard"]}>
        <AdminDashBoard />
      </MemoryRouter>,
    );

    expect(screen.getByText("No Appointments Today")).toBeTruthy();
  });
});
