import { Row } from "../pages/Doctor/DoctorsTable";
export const searchName = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  data: Row[],
  setState: React.Dispatch<React.SetStateAction<Row[]>>,
) => {
  let value = (e.target as HTMLInputElement).value;
  const searchedItem = data.filter((table) =>
    table.username.toLowerCase().includes(value),
  );
  console.log(searchedItem);
  setState(searchedItem);
};
