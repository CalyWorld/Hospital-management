import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const doctorFormSchema = z.object({
  username: z.string().min(4, { message: "username is required" }),
  password: z
    .string()
    .min(4, { message: "password must be at least 4 characters" }),
});

type doctorSignInSchemaType = z.infer<typeof doctorFormSchema>;

export default function DoctorForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<doctorSignInSchemaType>({
    resolver: zodResolver(doctorFormSchema),
  });

  const onSubmit: SubmitHandler<doctorSignInSchemaType> = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const doctorUser = { username: data.username, password: data.password };
      const response = await fetch(`${import.meta.env.VITE_API_DOCTOR_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorUser),
        credentials: "include",
      });
      if (response.ok) {
        setServerError(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setServerError(errorData.message || "Failed to sign in as doctor.");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div
      className="flex flex-col gap-10 justify-center items-center text-black w-626 h-417"
      style={{ height: "417px", width: "626px" }}
    >
      <div className="form-title">
        <h1 className="text-center">Login Doctor</h1>
      </div>
      <form
        className="flex flex-col gap-5 w-96 justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col gap-1.5">
          Username <br />
          <input
            className={`w-2.5/4 px-2 py-1 bg-white text-black border-1 border-indigo-10 border-b-indigo-100 ${
              errors.username
                ? "border-rose-500 border-b-1"
                : "border-2 border-indigo-50 border-b-indigo-500"
            }`}
            id="username"
            type="text"
            placeholder="Enter Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="px-2 py-1 text-sm italic text-red-500 mb-4">
              {errors.username?.message}
            </p>
          )}
        </label>
        <label className="flex flex-col gap-3">
          Password <br />
          <input
            className={`w-2.5/4 px-2 py-1 bg-white text-black border-slate-600 shadow-sm focus:outline-none focus:border-blue-500 ${
              errors.password ? "border-rose-500" : ""
            }`}
            id="password"
            type="password"
            placeholder="Enter Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="px-2 py-1 text-sm italic text-red-500 mb-4">
              {errors.password?.message}
            </p>
          )}
        </label>
        {serverError && <p className="text-red-500 text-center">{serverError}</p>}
        <div className="flex justify-center">
          <button disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
