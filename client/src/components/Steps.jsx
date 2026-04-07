import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className='flex flex-col items-center justify-center my-32'
    >
      {/* Title Section */}
      <motion.div variants={titleVariants} className="text-center mb-12">
        <motion.span
          className="inline-block text-blue-600 font-semibold text-sm mb-4 px-4 py-2 bg-blue-100 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          Simple Process
        </motion.span>
        <h1 className='text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          How it works
        </h1>
        <p className='text-lg text-gray-600'>Transform Words Into Stunning Images in 3 Simple Steps</p>
      </motion.div>

      {/* Steps Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className='space-y-4 w-full max-w-3xl'
      >
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className='group relative'
          >
            {/* Background gradient on hover */}
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />

            {/* Card */}
            <motion.div
              className='relative flex items-start gap-6 p-8 bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl shadow-lg cursor-pointer'
              whileHover={{
                y: -5,
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Step Number */}
              <motion.div
                className='flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-xl shadow-lg'
                whileHover={{ scale: 1.1 }}
              >
                {index + 1}
              </motion.div>

              {/* Icon */}
              <motion.div
                className='flex-shrink-0 mt-2'
                whileHover={{ rotate: 10 }}
              >
                <img width={40} src={item.icon} alt={item.title} className='hover:scale-110 transition' />
              </motion.div>

              {/* Content */}
              <div className='flex-1'>
                <motion.h2
                  className='text-2xl font-bold text-gray-900 mb-2'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  className='text-gray-600 leading-relaxed'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.description}
                </motion.p>
              </div>

              {/* Arrow Icon */}
              <motion.div
                className='flex-shrink-0 text-blue-600 text-2xl'
                whileHover={{ x: 5 }}
              >
                →
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Steps