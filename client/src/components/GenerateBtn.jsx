import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {

  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='pb-24 text-center my-24'
    >

      {/* Decorative Background */}
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl'></div>

        <motion.div
          className='relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 shadow-2xl'
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >

          <motion.h1
            className='text-3xl md:text-5xl font-bold text-white mb-2'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            See the Magic. Try Now
          </motion.h1>

          <motion.p
            className='text-blue-100 text-lg mb-8 max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join thousands of creators generating stunning images with AI. No credit card required.
          </motion.p>

          <motion.button
            onClick={onClickHandler}
            className='inline-flex items-center gap-3 px-10 md:px-16 py-4 rounded-full bg-white text-blue-600 font-bold text-lg shadow-xl hover:shadow-2xl transition-all'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 255, 255, 0.3)',
                '0 0 40px rgba(255, 255, 255, 0.5)',
                '0 0 20px rgba(255, 255, 255, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Generate Images Now
            <motion.img
              src={assets.star_group}
              alt="sparkles"
              className='w-6 h-6'
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </motion.button>

        </motion.div>
      </div>

    </motion.div>
  )
}

export default GenerateBtn