import { describe, expect, it, vi } from "vitest";

vi.mock("js-cookie", () => {
  const api = {
    get: vi.fn(() => undefined),
    set: vi.fn(),
    remove: vi.fn(),
  };
  return { default: api };
});

import Cookies from "js-cookie";
import { buildApiUrl } from "../config/api";
import { completeAppointment } from "../components/completeAppointment";
import { scheduledAppointMent } from "../components/scheduledAppointment";
import actionFormReducer, {
  resetActionForm,
  setOpenActionForm,
  setSelectedId,
} from "../redux/actionFormSlice";
import adminUserReducer, {
  setAdminUser,
  setToken,
} from "../redux/adminUserSlice";
import appointmentsReducer, {
  setDoctorAppointments,
  setPatientAppointments,
} from "../redux/appointmentsSlice";
import doctorAndPatientDetailReducer, {
  setDoctor,
  setPatient,
} from "../redux/doctorAndPatientDetailsSlice";
import doctorAndPatientReducer, {
  setDoctors,
  setPatients,
} from "../redux/doctorAndPatientSlice";
import doctorDayAvailabilityReducer, {
  setAvailableDoctors,
} from "../redux/doctorDayAvailability";
import healthRecordsReducer, { setHealthRecords } from "../redux/healthRecordsSlice";
import treatmentReducer, {
  setDoctorTreatments,
  setPatientTreatments,
} from "../redux/treamentSlice";

describe("config/api", () => {
  it("builds URLs from default base", () => {
    expect(buildApiUrl("/api/ping")).toBe("http://localhost:3000/api/ping");
  });
});

describe("appointment helpers", () => {
  const appointments = [
    { status: "completed" },
    { status: "scheduled" },
    { status: "canceled" },
  ] as any[];

  it("filters completed appointments", () => {
    expect(completeAppointment(appointments as any).length).toBe(1);
    expect(completeAppointment(appointments as any)[0].status).toBe("completed");
  });

  it("filters scheduled and canceled appointments", () => {
    const result = scheduledAppointMent(appointments as any);
    expect(result.length).toBe(2);
    expect(result.map((a) => a.status)).toEqual(["scheduled", "canceled"]);
  });
});

describe("redux/actionFormSlice", () => {
  it("sets and resets action form state", () => {
    let state = actionFormReducer(undefined, { type: "unknown" });
    state = actionFormReducer(state, setOpenActionForm("deleteDoctorForm"));
    state = actionFormReducer(state, setSelectedId("abc123"));

    expect(state.openActionForm).toBe("deleteDoctorForm");
    expect(state.selectedId).toBe("abc123");

    state = actionFormReducer(state, resetActionForm());
    expect(state.openActionForm).toBe("");
    expect(state.selectedId).toBe("");
  });
});

describe("redux/adminUserSlice", () => {
  it("sets and clears admin + token cookies", () => {
    let state = adminUserReducer(undefined, { type: "unknown" });

    state = adminUserReducer(
      state,
      setAdminUser({ username: "admin", password: "pw", role: "hospital-admin" }),
    );
    state = adminUserReducer(state, setToken("token-1"));

    expect(state.adminUser?.username).toBe("admin");
    expect(state.token).toBe("token-1");
    expect((Cookies.set as any).mock.calls.length).toBeGreaterThan(0);

    state = adminUserReducer(state, setAdminUser(null));
    state = adminUserReducer(state, setToken(null));

    expect(state.adminUser).toBeNull();
    expect(state.token).toBeNull();
    expect((Cookies.remove as any).mock.calls.length).toBeGreaterThan(0);
  });
});

describe("redux/doctorAndPatientSlice", () => {
  it("sets doctors and patients", () => {
    let state = doctorAndPatientReducer(undefined, { type: "unknown" });

    state = doctorAndPatientReducer(state, setDoctors([{ _id: "d1" }] as any));
    state = doctorAndPatientReducer(state, setPatients([{ _id: "p1" }] as any));

    expect(state.doctors).toHaveLength(1);
    expect(state.patients).toHaveLength(1);
  });
});

describe("redux/doctorAndPatientDetailsSlice", () => {
  it("sets doctor and patient detail", () => {
    let state = doctorAndPatientDetailReducer(undefined, { type: "unknown" });

    state = doctorAndPatientDetailReducer(state, setDoctor({ _id: "d1" } as any));
    state = doctorAndPatientDetailReducer(state, setPatient({ _id: "p1" } as any));

    expect(state.doctor?._id).toBe("d1");
    expect(state.patient?._id).toBe("p1");
  });
});

describe("redux/appointmentsSlice", () => {
  it("sets doctor and patient appointments", () => {
    let state = appointmentsReducer(undefined, { type: "unknown" });

    state = appointmentsReducer(state, setDoctorAppointments([{ _id: "a1" }] as any));
    state = appointmentsReducer(state, setPatientAppointments([{ _id: "a2" }] as any));

    expect(state.doctorsAppointment).toHaveLength(1);
    expect(state.patientsAppointment).toHaveLength(1);
  });
});

describe("redux/treamentSlice", () => {
  it("sets doctor and patient treatments", () => {
    let state = treatmentReducer(undefined, { type: "unknown" });

    state = treatmentReducer(state, setDoctorTreatments([{ _id: "t1" }] as any));
    state = treatmentReducer(state, setPatientTreatments([{ _id: "t2" }] as any));

    expect(state.doctorTreatments).toHaveLength(1);
    expect(state.patientTreatments).toHaveLength(1);
  });
});

describe("redux/healthRecordsSlice", () => {
  it("sets health records", () => {
    let state = healthRecordsReducer(undefined, { type: "unknown" });
    state = healthRecordsReducer(state, setHealthRecords([{ _id: "r1" }] as any));
    expect(state.healthRecords).toHaveLength(1);
  });
});

describe("redux/doctorDayAvailability", () => {
  it("sets available doctors", () => {
    let state = doctorDayAvailabilityReducer(undefined, { type: "unknown" });
    state = doctorDayAvailabilityReducer(
      state,
      setAvailableDoctors([{ _id: "d1" }, { _id: "d2" }] as any),
    );

    expect(state.doctors).toHaveLength(2);
  });
});
