import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "username is required" })
      .refine((data) => data.includes("@"), {
        message: "username must contain the @ symbol",
      }),
    password: z
      .string()
      .min(4, { message: "password must be at least 4 characters" }),
    confirmPassword: z
      .string()
      .min(4, { message: "confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwords don't match",
  });

export type signUpSchemaType = z.infer<typeof signUpFormSchema>;

function PatientSignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<signUpSchemaType> = async (data) => {
    const user = { username: data.username, password: data.password };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_PATIENT_SIGN_UP_API}`,
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        console.log("User data submitted successfully!");
      } else {
        console.error("User data submission failed.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return <div></div>;
}
