// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DoctorScheduledAppointmentTable from "../pages/Doctor/DoctorScheduledAppointmentTable";

const mockState = {
  doctorAndPatientAppointments: {
    doctorsAppointment: [
      {
        _id: "a1",
        title: "Scheduled Visit",
        status: "scheduled",
        createdAt: "2026-02-13T09:00:00.000Z",
        patient: { firstName: "John", lastName: "Doe" },
      },
      {
        _id: "a2",
        title: "Canceled Visit",
        status: "canceled",
        createdAt: "2026-02-13T10:00:00.000Z",
        patient: { firstName: "Jane", lastName: "Ray" },
      },
      {
        _id: "a3",
        title: "Completed Visit",
        status: "completed",
        createdAt: "2026-02-13T11:00:00.000Z",
        patient: { firstName: "Mark", lastName: "Lee" },
      },
    ],
    loading: false,
  },
};

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<object>("react-redux");
  return {
    ...actual,
    useSelector: (
      selector: (state: typeof mockState) =>
        | typeof mockState.doctorAndPatientAppointments.doctorsAppointment
        | boolean,
    ) => selector(mockState),
  };
});

describe("DoctorScheduledAppointmentTable", () => {
  it("renders scheduled/canceled appointments and excludes completed", () => {
    render(<DoctorScheduledAppointmentTable />);

    expect(screen.getByText("Scheduled Visit")).toBeTruthy();
    expect(screen.getByText("Canceled Visit")).toBeTruthy();
    expect(screen.queryByText("Completed Visit")).toBeNull();
  });
});
