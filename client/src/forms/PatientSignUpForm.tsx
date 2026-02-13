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

export default function PatientSignUpForm() {
  return <div></div>;
}
