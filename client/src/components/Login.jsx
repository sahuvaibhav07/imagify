import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/users/login', { email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success('Login successful!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/users/register', { email, password, name })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-md bg-black/40 flex justify-center items-center p-4'
    >

      <motion.form
        onSubmit={onSubmitHandler}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className='relative bg-gradient-to-br from-white to-gray-50 p-8 sm:p-10 rounded-3xl shadow-2xl text-slate-600 w-full max-w-md border border-gray-200'
      >

        {/* Header */}
        <motion.div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>{state}</h1>
          <p className='text-sm text-gray-500'>Welcome back! Please sign in to continue</p>
        </motion.div>

        {/* Name Input (Sign Up only) */}
        {state !== 'Login' && (
          <motion.div
            custom={0}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            className='flex items-center gap-3 bg-white border-2 border-gray-200 px-4 py-3 rounded-xl mt-5 focus-within:border-blue-600 transition'
          >
            <img src={assets.profile_icon} alt="" className='w-5 opacity-60' />
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              className='outline-none text-sm flex-1 bg-white'
              placeholder='Full Name'
              required
            />
          </motion.div>
        )}

        {/* Email Input */}
        <motion.div
          custom={state !== 'Login' ? 1 : 0}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className='flex items-center gap-3 bg-white border-2 border-gray-200 px-4 py-3 rounded-xl mt-4 focus-within:border-blue-600 transition'
        >
          <img src={assets.email_icon} alt="" className='w-5 opacity-60' />
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            className='outline-none text-sm flex-1 bg-white'
            placeholder='Email id'
            required
          />
        </motion.div>

        {/* Password Input */}
        <motion.div
          custom={state !== 'Login' ? 2 : 1}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className='flex items-center gap-3 bg-white border-2 border-gray-200 px-4 py-3 rounded-xl mt-4 focus-within:border-blue-600 transition'
        >
          <img src={assets.lock_icon} alt="" className='w-5 opacity-60' />
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            className='outline-none text-sm flex-1 bg-white'
            placeholder='Password'
            required
          />
        </motion.div>

        {/* Forgot Password */}
        {state === 'Login' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-sm text-blue-600 mt-5 cursor-pointer hover:text-blue-700 transition font-medium'
          >
            Forgot Password?
          </motion.p>
        )}

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          type="submit"
          className='w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl mt-6 font-semibold hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? (
            <span className='flex items-center justify-center gap-2'>
              <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
              Processing...
            </span>
          ) : (
            state === 'Login' ? 'Login' : 'Create Account'
          )}
        </motion.button>

        {/* Toggle Login/Sign Up */}
        {state === 'Login' ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mt-6 text-center text-sm'
          >
            Don't have an account?
            <span
              className='text-blue-600 cursor-pointer hover:text-blue-700 font-semibold ml-1 transition'
              onClick={() => setState('Sign Up')}
            >
              Sign up
            </span>
          </motion.p>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mt-6 text-center text-sm'
          >
            Already have an account?
            <span
              className='text-blue-600 cursor-pointer hover:text-blue-700 font-semibold ml-1 transition'
              onClick={() => setState('Login')}
            >
              Login
            </span>
          </motion.p>
        )}

        {/* Close Button */}
        <motion.img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className='absolute top-6 right-6 cursor-pointer w-6 opacity-60 hover:opacity-100 transition'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />

      </motion.form>

    </motion.div>
  )
}

export default Login