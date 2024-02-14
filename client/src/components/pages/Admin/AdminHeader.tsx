import PersonIcon from "@mui/icons-material/Person";
export default function AdminHeader() {
  return (
    <header className="p-2">
      <nav className="flex justify-end">
        <PersonIcon fontSize="large" />
      </nav>
    </header>
  );
}
