import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const base =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const active =
    "bg-white text-gray-900 shadow";
  const inactive =
    "text-white/90 hover:text-white hover:bg-white/10";

  return (
    <header className="w-full bg-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Title */}
          <Link to="/" className="text-xl font-bold text-white">
            MyApp
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/predict-page/*"
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              Prediction
            </NavLink>

            <NavLink
              to="/detection"
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              Detection
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
