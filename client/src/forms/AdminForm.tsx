import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const adminFormSchema = z.object({
  username: z.string().min(4, { message: "username is required" }),
  password: z
    .string()
    .min(4, { message: "password must be at least 4 characters" }),
});

type adminSignInSchemaType = z.infer<typeof adminFormSchema>;

export default function AdminForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<adminSignInSchemaType>({
    resolver: zodResolver(adminFormSchema),
  });

  const onSubmit: SubmitHandler<adminSignInSchemaType> = async (data) => {
    try {
      const adminUser = { username: data.username, password: data.password };
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminUser),
        credentials: "include",
      });
      if (response.ok) {
        console.log("admin-succesful");
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (err) {
      console.log("error occured during admin sign in", err);
    }
  };
  return (
    <div
      className="flex flex-col gap-10 justify-center bg-purple text-white w-626 h-417"
      style={{ height: "417px", width: "626px" }}
    >
      <div className="form-title">
        <h1>Welcome Back !</h1>
        <p>login Admin</p>
      </div>
      <form
        className="flex flex-col gap-5 justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          Username <br />
          <input
            className={`w-2/4 px-2 py-1 bg-white text-black border rounded-md focus:outline-none focus:border-blue-500 ${
              errors.username ? "border-red-500" : ""
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
        <label>
          Password <br />
          <input
            className={`w-2/4 px-2 py-1 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
            id="password"
            type="text"
            placeholder="Enter Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="px-2 py-1 text-sm italic text-red-500 mb-4">
              {errors.password?.message}
            </p>
          )}
        </label>
        <div className="flex justify-center">
          <button>Sign in</button>
        </div>
      </form>
    </div>
  );
}
