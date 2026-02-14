import { useOutletContext } from "react-router";
import { AdminOutletContext } from "./AdminPage";

export default function AdminSettings() {
  const { theme, setTheme } = useOutletContext<AdminOutletContext>();

  return (
    <div className="max-w-xl p-6 rounded-md shadow bg-inherit">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <p className="mb-3 text-sm">Choose a theme for the admin outlet.</p>
      <div className="flex gap-3">
        <button
          className={`px-4 py-2 rounded border ${
            theme === "light"
              ? "bg-darkBlue text-white border-darkBlue"
              : "border-gray-300"
          }`}
          onClick={() => setTheme("light")}
        >
          Light Theme
        </button>
        <button
          className={`px-4 py-2 rounded border ${
            theme === "dark"
              ? "bg-darkBlue text-white border-darkBlue"
              : "border-gray-300"
          }`}
          onClick={() => setTheme("dark")}
        >
          Dark Theme
        </button>
      </div>
    </div>
  );
}
