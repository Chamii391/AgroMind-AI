import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { path: "/", label: "Home", end: true },
    { path: "/about", label: "About", end: false },
    { path: "/predict-page", label: "Prediction", end: false },
    { path: "/contact", label: "Contact", end: false },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-emerald-100"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between py-4">
          
          {/* ===== Logo ===== */}
          <Link
            to="/"
            className="group flex items-center gap-3 transition-all duration-500 hover:scale-105"
          >
            {/* Logo Mark */}
            <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 group-hover:rotate-6 transition-all duration-500">
              {/* Leaf Icon */}
              <svg 
                className="w-6 h-6 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
              
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-emerald-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
            </div>

            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                AgroMind
              </span>
              <span className="text-[10px] text-emerald-600/70 font-medium tracking-[0.2em] uppercase">
                AI Agriculture
              </span>
            </div>
          </Link>

          {/* ===== Desktop Navigation ===== */}
          <nav className="hidden md:flex items-center gap-1 bg-emerald-50/80 p-1.5 rounded-2xl border border-emerald-100">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-emerald-700 shadow-md shadow-emerald-100"
                      : "text-emerald-700/70 hover:text-emerald-700 hover:bg-white/50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ===== CTA Button ===== */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/predict-page"
              className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              
              <span className="relative flex items-center gap-2">
                <span>Get Started</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* ===== Mobile Menu Button ===== */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center hover:bg-emerald-100 transition-all duration-300 border border-emerald-100"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span
                className={`w-5 h-0.5 bg-emerald-700 rounded-full transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-emerald-700 rounded-full transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-emerald-700 rounded-full transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-out ${
          isMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-b border-emerald-100 shadow-xl shadow-emerald-500/5">
          <nav className="flex flex-col px-6 py-6 space-y-2">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200"
                      : "text-gray-700 hover:bg-emerald-50"
                  }`
                }
                style={{
                  transitionDelay: isMenuOpen ? `${index * 75}ms` : "0ms",
                }}
              >
                {/* Number indicator */}
                <span className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center text-sm text-emerald-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}

            {/* Mobile CTA */}
            <Link
              to="/get-started"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 mt-4 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300 active:scale-95"
            >
              <span>Get Started</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}