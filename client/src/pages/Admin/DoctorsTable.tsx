import { CompactTable } from "@table-library/react-table-library/compact";
import { Doctor, useDoctor } from "../../contexts/doctorContext";
export default function DoctorsTable() {
  const { doctors, loading } = useDoctor();
  const nodes = doctors;
  console.log(nodes);
  const COLUMNS = [
    {
      label: "DATE",
      renderCell: (item: Doctor) => {
        const createdAtDate = new Date(item.createdAt);
        return isNaN(createdAtDate.getTime())
          ? "Invalid Date"
          : createdAtDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
      },
    },
    {
      label: "Name",
      renderCell: (item: Doctor) => `${item.firstName} ${item.lastName}`,
    },
    { label: "AGE", renderCell: (item: Doctor) => item.age },
    { label: "COUNTRY", renderCell: (item: Doctor) => item.country },
    { label: "GENDER", renderCell: (item: Doctor) => item.gender },
  ];

  const Component = () => {
    const data = { nodes };

    return <CompactTable columns={COLUMNS} data={data} />;
  };

  return (
    <div>
      <p>LATEST DOCTOR</p>
      {loading ? (
        <p className="flex justify-center">Loading...</p>
      ) : (
        Component()
      )}
    </div>
  );
}
