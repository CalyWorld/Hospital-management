import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

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
      const response = await fetch(`${import.meta.env.VITE_API_ADMIN_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminUser),
        credentials: "include",
      });
      if (response.ok) {
        const user = await response.json();
        Cookies.set(
          "adminUser",
          JSON.stringify({
            username: user.username,
            password: user.password,
            __v: user.__v,
            _id: user._id,
          }),
          { expires: 29 },
        );
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
