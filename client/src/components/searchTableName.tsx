import { Row } from "../pages/Doctor/DoctorsTable";
export const searchName = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  data: Row[],
  setState: React.Dispatch<React.SetStateAction<Row[]>>,
) => {
  let value = (e.target as HTMLInputElement).value;
  const searchedItem = data.filter((table) => {
    const usernameString = `${table.username.props.children[0].props.children[0]} ${table.username.props.children[0].props.children[2]}`;

    return usernameString.toLowerCase().includes(value);
  });
  console.log("searched-item", searchedItem);
  setState(searchedItem);
};
