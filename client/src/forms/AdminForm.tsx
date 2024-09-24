import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setAdminUser, setToken } from "../redux/adminUserSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// Zod schema
const adminFormSchema = z.object({
  username: z.string().min(4, { message: "Username is required" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});

type adminSignInSchemaType = z.infer<typeof adminFormSchema>;

export default function AdminForm() {
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // Import setError to set form errors programmatically
  } = useForm<adminSignInSchemaType>({
    resolver: zodResolver(adminFormSchema),
  });

  const onSubmit: SubmitHandler<adminSignInSchemaType> = async (data) => {
    try {
      const adminUser = { username: data.username, password: data.password };
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminUser),
        credentials: "include",
      });

      if (response.ok) {
        const user = await response.json();
        dispatch(setAdminUser(user));
        dispatch(setToken(user.token));
      } else {
        const errorData = await response.json();

        // Check for server-side validation errors
        if (errorData.message === "Invalid username") {
          setError("username", {
            type: "server",
            message: errorData.message,
          });
        } else if (errorData.message === "Invalid password") {
          setError("password", {
            type: "server",
            message: errorData.message,
          });
        } else {
          setServerError(errorData.message); // General errors that are not field-specific
        }
      }
    } catch (err) {
      console.log("Error occurred during admin sign-in", err);
      setServerError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col gap-10 justify-center items-center text-black w-626 h-417"
      style={{ height: "417px", width: "626px" }}
    >
      <div className="form-title">
        <h1 className="text-center">Login Admin</h1>
      </div>
      <form
        className="flex flex-col gap-5 w-96 justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col gap-1.5">
          Username <br />
          <input
            className={`w-2.5/4 px-2 py-1 bg-white text-black ${
              errors.username ? "border-rose-500 border-b" : "border-b"
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
            className={`w-2.5/4 px-2 py-1 bg-white text-black ${
              errors.password ? "border-rose-500 border-b" : "border-b"
            }`}
            id="password"
            type="password" // Should be password type
            placeholder="Enter Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="px-2 py-1 text-sm italic text-red-500 mb-4">
              {errors.password?.message}
            </p>
          )}
        </label>
        {serverError && (
          <p className="text-red-500 text-center">{serverError}</p>
        )}
        <div className="flex justify-center bg-darkBlue px-1 py-2 text-white rounded-md">
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}
