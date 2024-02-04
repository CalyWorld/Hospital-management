import { useAdminUser } from "../../contexts/adminUserContext";
import AdminLoginPage from "./AdminLoginPage";
import AdminPage from "./AdminPage";
import React from "react";
export default function AdminHomePage() {
  const { adminUser } = useAdminUser();
  console.log(adminUser);
  return (
    <>
      {adminUser ? (
        <React.Fragment>
          <AdminPage />
        </React.Fragment>
      ) : (
        <AdminLoginPage />
      )}
    </>
  );
}
