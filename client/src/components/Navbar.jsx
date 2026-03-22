import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const { user, setShowLogin, logout, credits } = useContext(AppContext)

  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between py-4 px-4">

      {/* LOGO */}
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      {/* RIGHT SIDE */}
      <div>

        {user ? (

          <div className="flex items-center gap-3 sm:gap-4">

            {/* ✅ NEW CREDIT UI */}
            <div
              onClick={() => navigate('/buy')}
              className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border shadow-sm cursor-pointer hover:scale-105 transition"
            >
              <div className="bg-blue-100 p-1 rounded-full">
                <img src={assets.credit_star} alt="" className="w-4" />
              </div>
              <p className="text-sm text-gray-700 font-medium">
                Credits left : {credits}
              </p>
            </div>

            {/* USER NAME */}
            <p className="text-gray-600 max-sm:hidden">
              Hi,  {user?.name}
            </p>

            {/* PROFILE */}
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10 drop-shadow cursor-pointer" alt="" />

              {/* DROPDOWN */}
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    className="py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>

          </div>

        ) : (

          <div className="flex items-center gap-3 sm:gap-5">

            <p
              onClick={() => navigate('/buy')}
              className="cursor-pointer"
            >
              Pricing
            </p>

            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full"
            >
              Login
            </button>

          </div>

        )}

      </div>

    </div>
  )
}

export default Navbar