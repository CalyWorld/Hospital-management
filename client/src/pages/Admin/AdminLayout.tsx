import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { FaUserDoctor } from "react-icons/fa6";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { FaHospitalUser } from "react-icons/fa";
import { useState } from "react";
export default function AdminLayout() {
  const [sideNavTabLink, setNavTabLink] = useState("");
  return (
    <nav
      id="sidebar"
      className="bg-darkBlue w-48 h-full text-white flex flex-col gap-10 p-3"
    >
      <ul>
        <li>
          <a href="/admin">
            <HealthAndSafetyIcon />
          </a>
        </li>
      </ul>
      <div className="h-full flex flex-col justify-between">
        <ul className="flex flex-col items-center gap-3">
          <li className="w-full">
            <Link
              to={`/admin/dashboard`}
              className={`${
                sideNavTabLink === "dashboard"
                  ? "flex gap-4 p-2 w-full items-center cursor-pointer shadow bg-[#4b5563] rounded-md"
                  : "flex gap-4 p-2 w-full items-center cursor-pointer hover:shadow rounded-md hover:bg-[#374151]"
              }`}
              onClick={() => {
                setNavTabLink("dashboard");
              }}
            >
              <HomeIcon sx={{ fontSize: 23 }} />
              <p>Dashboard</p>
            </Link>
          </li>
          <li className="w-full">
            <Link
              to={`/admin/doctors`}
              className={`${
                sideNavTabLink === "doctors"
                  ? "flex gap-4 p-2 w-full items-center cursor-pointer shadow bg-[#4b5563] rounded-md"
                  : "flex gap-4 p-2 w-full items-center cursor-pointer hover:shadow rounded-md hover:bg-[#374151]"
              }`}
              onClick={() => {
                setNavTabLink("doctors");
              }}
            >
              <FaUserDoctor size={23} />
              <p>Doctor</p>
            </Link>
          </li>
          <li className="w-full">
            <Link
              to={`/admin/patients`}
              className={`${
                sideNavTabLink === "patients"
                  ? "flex gap-4 p-2 w-full items-center  cursor-pointer shadow bg-[#4b5563] rounded-md"
                  : "flex gap-4 p-2 w-full items-center cursor-pointer hover:shadow rounded-md hover:bg-[#374151]"
              }`}
              onClick={() => {
                setNavTabLink("patients");
              }}
            >
              <FaHospitalUser size={23} />
              <p>Patient</p>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col items-center gap-5">
          <div
            className={`${
              sideNavTabLink === "settings"
                ? "flex gap-5 p-2 w-full items-center justify-center cursor-pointer shadow bg-[#4b5563] rounded-md"
                : "flex gap-5 p-2 w-full items-center justify-center cursor-pointer hover:shadow rounded-md hover:bg-[#374151]"
            }`}
            onClick={() => {
              setNavTabLink("settings");
            }}
          >
            <SettingsIcon />
          </div>
          <div
            className={`${
              sideNavTabLink === "logout"
                ? "flex gap-5 p-2 w-full items-center justify-center cursor-pointer shadow bg-[#4b5563] rounded-md"
                : "flex gap-5 p-2 w-full items-center justify-center cursor-pointer hover:shadow rounded-md hover:bg-[#374151]"
            }`}
            onClick={() => {
              setNavTabLink("logout");
            }}
          >
            <LogoutIcon />
          </div>
        </ul>
      </div>
    </nav>
  );
}
