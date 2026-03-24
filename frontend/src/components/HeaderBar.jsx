import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const HeaderBar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <div>
        <h2>Task Dashboard</h2>
        <p>{user?.name || "User"}</p>
      </div>

      <div className="topbar-actions">
        <button className="ghost-button" onClick={toggleTheme}>
          {theme === "light" ? <FiMoon /> : <FiSun />} {theme === "light" ? "Dark" : "Light"}
        </button>
        <button className="ghost-button danger" onClick={logout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;
