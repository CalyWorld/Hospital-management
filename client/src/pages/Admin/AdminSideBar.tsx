import { Link } from "react-router-dom";
export default function AdminSideBar() {
  return (
    <div
      id="sidebar"
      className="h-screen w-48 bg-darkBlue text-white flex flex-col items-center justify-between p-5"
    >
      <div className="flex flex-col items-center gap-10">
        <a href="/admin">
          <h2>icon</h2>
        </a>
        <nav>
          <ul className="flex flex-col items-center gap-10">
            <li>
              <Link to={`/admin/dashboard`}>Dashboard</Link>
            </li>
            <li>
              <Link to={`/admin/doctors`}>Doctor</Link>
            </li>
            <li>
              <Link to={`/admin/patients`}>Patient</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <div>settings</div>
        <div>logout</div>
      </div>
    </div>
  );
}
