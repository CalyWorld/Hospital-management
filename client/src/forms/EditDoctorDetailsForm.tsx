import { useEffect, useState } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { DoctorUser } from "../types";
import { resetActionForm } from "../redux/actionFormSlice";
import Cookies from "js-cookie";
import { setDoctors } from "../redux/doctorAndPatientSlice";
import { buildApiUrl } from "../config/api";

const editDoctorDetailSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First Name is required" })
    .min(4, { message: "First Name should be at least 4 characters long" }),
  lastName: z
    .string()
    .min(1, { message: "Last Name is required" })
    .min(3, { message: "Last Name should be at least 4 characters long" }),
  country: z.string().min(1, { message: "Country is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  age: z.number().min(23, { message: "Age must be above 22" }),
  address: z.string().min(1, { message: "Address is required" }),
});

type editDoctorDetailSchemaType = z.infer<typeof editDoctorDetailSchema>;
type DoctorDetails = {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  age: number;
  address: string;
};
export interface SelectedId {
  selectedId: string;
}
export default function EditDoctorDetail({ selectedId }: SelectedId) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editDoctorDetailSchemaType>({
    resolver: zodResolver(editDoctorDetailSchema),
  });
  const dispatch: AppDispatch = useDispatch();
  const doctors = useSelector(
    (state: RootState) => state.doctorAndPatientUser.doctors,
  );
  const [editDoctor, setEditDoctorForm] = useState<DoctorDetails | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const doctorId = selectedId;
  const doctor = doctors?.find((doctor: DoctorUser) => doctor._id === doctorId);

  useEffect(() => {
    if (!doctor) {
      return;
    }
    setEditDoctorForm({
      firstName: doctor.firstName ?? "",
      lastName: doctor.lastName ?? "",
      gender: doctor.gender.toLowerCase(),
      country: doctor.country ?? "",
      age: doctor.age,
      address: doctor.address ?? "",
    });
  }, [doctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target;
    setEditDoctorForm((prevEditDoctor) =>
      prevEditDoctor
        ? {
            ...prevEditDoctor,
            [target.name]:
              target.name === "age" && typeof target.value === "string"
                ? Number(target.value)
                : target.value,
          }
        : null,
    );
  };
  const onSubmit: SubmitHandler<editDoctorDetailSchemaType> = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(buildApiUrl(`/api/admin/doctor/${doctorId}`), {
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
        setServerError(errorData.message || "Failed to update doctor details.");
        return;
      }

      const updatedDoctor = (await response.json()) as DoctorUser;
      const nextDoctors = doctors.map((existingDoctor) =>
        existingDoctor._id === updatedDoctor._id
          ? { ...existingDoctor, ...updatedDoctor }
          : existingDoctor,
      );
      dispatch(setDoctors(nextDoctors));
      dispatch(resetActionForm());
    } catch {
      setServerError("Unexpected error while updating doctor details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!editDoctor) {
    return (
      <div className="p-5">
        <p className="text-sm text-gray-600">Doctor not found.</p>
      </div>
    );
  }

  return (
    <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              First Name{" "}
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                id="firstName"
                type="text"
                placeholder="Jane"
                {...register("firstName")}
                value={editDoctor.firstName}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <p className="text-red-500 text-xs italic">
              {errors.firstName?.message}
            </p>
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
                value={editDoctor.lastName}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <p className="text-red-500 text-xs italic">
              {errors.lastName?.message}
            </p>
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
                  value={editDoctor.gender}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </label>
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
                value={editDoctor.country}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <p className="text-red-500 text-xs italic">
              {errors.country?.message}
            </p>
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Age
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                id="age"
                type="text"
                placeholder="21"
                {...register("age", { valueAsNumber: true })}
                value={editDoctor.age}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <p className="text-red-500 text-xs italic">{errors.age?.message}</p>
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
                value={editDoctor.address}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <p className="text-red-500 text-xs italic">
              {errors.address?.message}
            </p>
          </div>
        </div>
        {serverError && (
          <p className="text-red-500 text-xs italic">{serverError}</p>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="text-black py-2 px-4 rounded border border-gray-300"
            onClick={(e) => {
              e.preventDefault(); // Prevent default form submission
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
