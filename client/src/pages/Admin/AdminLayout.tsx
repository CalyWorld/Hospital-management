import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { FaUserDoctor } from "react-icons/fa6";
import SettingsIcon from "@mui/icons-material/Settings";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { FaHospitalUser } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import { useState } from "react";
interface AdminLayout {
  setResponsiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AdminLayout({ setResponsiveModal }: AdminLayout) {
  const [sideNavTabLink, setNavTabLink] = useState<string>("");

  return (
    <nav
      id="sidebar"
      className="bg-darkBlue w-48 fixed md:static top-0 left-0 bottom-0 z-20 md:z-auto text-white flex flex-col p-3 min-h-screen"
    >
      <ul>
        <li className="flex items-center justify-between">
          <a href="/admin">
            <HealthAndSafetyIcon />
          </a>
          <div
            className="xs:block sm:block md:block lg:hidden"
            onClick={() => {
              setResponsiveModal(false);
            }}
          >
            <TfiClose size={20} />
          </div>
        </li>
      </ul>
      <ul className="flex flex-col items-center gap-3 flex-grow mt-5">
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
            to={"/admin/appointments"}
            className={`${
              sideNavTabLink === "appointments"
                ? "flex gap-4 p-2 w-full items-center cursor-pointer shadow bg-[#4b5563] rounded-md"
                : "flex gap-4 p-2 w-full items-center cursor-pointer hover:shadow rounded-md hover:bg-[#374151]"
            }`}
            onClick={() => {
              setNavTabLink("appointments");
            }}
          >
            <EventIcon />
            <p>Appointments</p>
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

      {/* Settings and Logout at the bottom */}
      <ul className="flex flex-col items-center gap-5 mt-auto">
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
    </nav>
  );
}
