import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {

  const { user, setShowLogin, logout, credits } = useContext(AppContext)
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
  }

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  }

  return (
    <motion.div 
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-between py-5 px-4 md:px-8 sticky top-0 z-50 glass-effect backdrop-blur-md border-b border-gray-200"
    >

      {/* LOGO */}
      <Link to="/">
        <motion.img 
          src={assets.logo} 
          alt="Imagify" 
          className="w-28 sm:w-32 lg:w-40 cursor-pointer hover:opacity-80 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        />
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 sm:gap-6">
        {user ? (
          <motion.div 
            className="flex items-center gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* HISTORY LINK */}
            <motion.p
              onClick={() => navigate('/history')}
              className="cursor-pointer font-semibold text-gray-700 hover:text-blue-600 transition max-sm:hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📸 History
            </motion.p>

            {/* CREDIT BUTTON */}
            <motion.div
              onClick={() => navigate('/buy')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full cursor-pointer shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="bg-blue-500 p-1.5 rounded-full">
                <img src={assets.credit_star} alt="credits" className="w-4" />
              </div>
              <p className="text-sm font-semibold">
                {credits} Credits
              </p>
            </motion.div>

            {/* USER NAME */}
            <motion.p 
              className="text-gray-700 max-sm:hidden font-medium text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hi, {user?.name?.split(' ')[0]}!
            </motion.p>

            {/* PROFILE DROPDOWN */}
            <motion.div 
              className="relative"
              onHoverStart={() => setDropdownOpen(true)}
              onHoverEnd={() => setDropdownOpen(false)}
            >
              <motion.img 
                src={assets.profile_icon} 
                className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition shadow-md"
                alt="profile"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute -right-2 top-12 z-10 mt-2"
                  >
                    <div className="glass-effect rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                      <motion.button
                        onClick={handleLogout}
                        className="w-full py-3 px-6 text-left text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 font-semibold transition text-sm"
                        whileHover={{ paddingLeft: 24 }}
                      >
                        Logout
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </motion.div>

        ) : (

          <motion.div 
            className="flex items-center gap-3 sm:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* PRICING LINK */}
            <motion.p
              onClick={() => navigate('/buy')}
              className="cursor-pointer font-semibold text-gray-700 hover:text-blue-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Pricing
            </motion.p>

            {/* LOGIN BUTTON */}
            <motion.button
              onClick={() => setShowLogin(true)}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

          </motion.div>

        )}
      </div>

    </motion.div>
  )
}

export default Navbar