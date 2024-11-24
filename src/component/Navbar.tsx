import React from "react"
import { Link, useLocation } from "react-router-dom"

export const Navbar: React.FC = () => {
  const location = useLocation()

  // Helper function to determine if a link is active
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              ESTATÍSTICAS DO X5 LUMOS
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/new"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/new")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-800 hover:text-blue-600"
              }`}
            >
              Registrar partida
            </Link>
            <Link
              to="/new-player"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/new-player")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-800 hover:text-blue-600"
              }`}
            >
              Adicionar jogador
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => {
                const menu = document.getElementById("mobile-menu")
                menu?.classList.toggle("hidden")
              }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="md:hidden hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <Link
            to="/new"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/new")
                ? "text-blue-600 font-semibold"
                : "text-gray-800 hover:text-blue-600"
            }`}
          >
            Registrar partida
          </Link>
          <Link
            to="/new-player"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/new-player")
                ? "text-blue-600 font-semibold"
                : "text-gray-800 hover:text-blue-600"
            }`}
          >
            Adicionar jogador
          </Link>
        </div>
      </div>
    </nav>
  )
}
