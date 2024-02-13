import { useParams } from "react-router";

export function DoctorDetails() {
  const { doctorId } = useParams();
  console.log(doctorId);
  return <div>welcome to doctor detail</div>;
}
