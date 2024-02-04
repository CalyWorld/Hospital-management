import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

interface AdminUser {
  username: string;
  password: string;
  __v: number;
  _id: string;
}

interface AdminUserContextProps {
  adminUser: AdminUser | null;
  setAdminUser: React.Dispatch<React.SetStateAction<AdminUser | null>>;
  updateAdminUserDetails: (updatedDetails: AdminUser) => void;
}

interface AdminUserProviderProps {
  children: ReactNode;
}

const AdminUserContext = createContext<AdminUserContextProps | undefined>(
  undefined,
);

export const useAdminUser = () => {
  const context = useContext(AdminUserContext);
  if (!context) {
    throw new Error("useAdminUser must be used within AdminUserProvider");
  }
  return context;
};

export const AdminUserProvider: React.FC<AdminUserProviderProps> = ({
  children,
}: AdminUserProviderProps) => {
  const adminUserFromCookies = Cookies.get("adminUser");
  const initialUser = adminUserFromCookies
    ? JSON.parse(adminUserFromCookies)
    : null;

  const [adminUser, setAdminUser] = useState<AdminUser | null>(initialUser);

  useEffect(() => {
    if (adminUser) {
      Cookies.set("adminUser", JSON.stringify(adminUser), { expires: 29 });
    } else {
      Cookies.remove("adminUser");
    }
  }, [adminUser]);

  const updateAdminUserDetails = (updatedDetails: AdminUser) => {
    setAdminUser((prevAdminUser) => ({
      ...prevAdminUser,
      ...updatedDetails,
    }));
  };

  const contextValue = {
    adminUser,
    setAdminUser,
    updateAdminUserDetails,
  };

  return (
    <AdminUserContext.Provider value={contextValue}>
      {children}
    </AdminUserContext.Provider>
  );
};
