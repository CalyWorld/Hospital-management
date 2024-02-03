import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "./PatientSignUpForm";
import { signUpSchemaType } from "./PatientSignUpForm";

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
