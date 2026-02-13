import { useEffect, useState } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { PatientUser } from "../types";
import { resetActionForm } from "../redux/actionFormSlice";
import Cookies from "js-cookie";
import { setPatients } from "../redux/doctorAndPatientSlice";
import { buildApiUrl } from "../config/api";

const editPatientDetailSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First Name is required" })
    .min(2, { message: "First Name should be at least 2 characters long" }),
  lastName: z
    .string()
    .min(1, { message: "Last Name is required" })
    .min(2, { message: "Last Name should be at least 2 characters long" }),
  country: z.string().min(1, { message: "Country is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  age: z.number().min(1, { message: "Age must be a positive number" }),
  phoneBook: z.number().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
});

type EditPatientDetailSchemaType = z.infer<typeof editPatientDetailSchema>;

type PatientDetails = {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  age: number;
  phoneBook: number;
  address: string;
};

export interface SelectedId {
  selectedId: string;
}

export default function EditPatientDetailsForm({ selectedId }: SelectedId) {
  const dispatch: AppDispatch = useDispatch();
  const patients = useSelector(
    (state: RootState) => state.doctorAndPatientUser.patients,
  );

  const [editPatient, setEditPatient] = useState<PatientDetails | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPatientDetailSchemaType>({
    resolver: zodResolver(editPatientDetailSchema),
  });

  useEffect(() => {
    const selectedPatient = patients.find((patient: PatientUser) => patient._id === selectedId);
    if (!selectedPatient) {
      return;
    }

    setEditPatient({
      firstName: selectedPatient.firstName ?? "",
      lastName: selectedPatient.lastName ?? "",
      gender: selectedPatient.gender.toLowerCase(),
      country: selectedPatient.country ?? "",
      age: selectedPatient.age,
      phoneBook: selectedPatient.phoneBook,
      address: selectedPatient.address ?? "",
    });
  }, [patients, selectedId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target;
    setEditPatient((prevEditPatient) =>
      prevEditPatient
        ? {
            ...prevEditPatient,
            [target.name]:
              ["age", "phoneBook"].includes(target.name) &&
              typeof target.value === "string"
                ? Number(target.value)
                : target.value,
          }
        : null,
    );
  };

  const onSubmit: SubmitHandler<EditPatientDetailSchemaType> = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(buildApiUrl(`/api/admin/patient/${selectedId}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setServerError(errorData.message || "Failed to update patient details.");
        return;
      }

      const updatedPatient = (await response.json()) as PatientUser;
      const nextPatients = patients.map((existingPatient) =>
        existingPatient._id === updatedPatient._id
          ? { ...existingPatient, ...updatedPatient }
          : existingPatient,
      );
      dispatch(setPatients(nextPatients));
      dispatch(resetActionForm());
    } catch {
      setServerError("Unexpected error while updating patient details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!editPatient) {
    return (
      <div className="p-5">
        <p className="text-sm text-gray-600">Patient not found.</p>
      </div>
    );
  }

  return (
    <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              First Name
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                id="firstName"
                type="text"
                placeholder="Jane"
                {...register("firstName")}
                value={editPatient.firstName}
                onChange={handleChange}
              />
            </label>
            <p className="text-red-500 text-xs italic">{errors.firstName?.message}</p>
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Last Name
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                value={editPatient.lastName}
                onChange={handleChange}
              />
            </label>
            <p className="text-red-500 text-xs italic">{errors.lastName?.message}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative w-full">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Gender
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                  id="gender"
                  {...register("gender")}
                  value={editPatient.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </label>
            <p className="text-red-500 text-xs italic">{errors.gender?.message}</p>
          </div>

          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Country
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                id="country"
                type="text"
                placeholder="USA"
                {...register("country")}
                value={editPatient.country}
                onChange={handleChange}
              />
            </label>
            <p className="text-red-500 text-xs italic">{errors.country?.message}</p>
          </div>

          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Age
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                id="age"
                type="number"
                {...register("age", { valueAsNumber: true })}
                value={editPatient.age}
                onChange={handleChange}
              />
            </label>
            <p className="text-red-500 text-xs italic">{errors.age?.message}</p>
          </div>

          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Phone Number
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                id="phoneBook"
                type="number"
                {...register("phoneBook", { valueAsNumber: true })}
                value={editPatient.phoneBook}
                onChange={handleChange}
              />
            </label>
            <p className="text-red-500 text-xs italic">{errors.phoneBook?.message}</p>
          </div>

          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Address
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                id="address"
                type="text"
                placeholder="Makati Manila"
                {...register("address")}
                value={editPatient.address}
                onChange={handleChange}
              />
            </label>
            <p className="text-red-500 text-xs italic">{errors.address?.message}</p>
          </div>
        </div>

        {serverError && <p className="text-red-500 text-xs italic">{serverError}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="text-black py-2 px-4 rounded border border-gray-300"
            onClick={(e) => {
              e.preventDefault();
              dispatch(resetActionForm());
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-darkBlue text-white py-2 px-4 rounded disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Edit"}
          </button>
        </div>
      </div>
    </form>
  );
}
