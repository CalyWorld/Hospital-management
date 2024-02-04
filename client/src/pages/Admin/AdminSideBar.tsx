import { Link } from "react-router-dom";
export default function AdminSideBar() {
  return (
    <div id="sidebar" className="w-64 bg-darkBlue text-white">
      <h2>Hospital Management</h2>
      <nav>
        <ul>
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
  );
}
