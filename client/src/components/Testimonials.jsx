import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Testimonials = () => {

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className='flex flex-col items-center justify-center my-32 py-12'
    >

      {/* Header */}
      <motion.div
        className='text-center mb-12'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.span
          className="inline-block text-blue-600 font-semibold text-sm mb-4 px-4 py-2 bg-blue-100 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          Success Stories
        </motion.span>
        <h1 className='text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          Customer Testimonials
        </h1>
        <p className='text-lg text-gray-600'>See what thousands of satisfied users are saying about Imagify</p>
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className='flex flex-wrap gap-6 justify-center'
      >

        {testimonialsData.map((testimonial, index) => (

          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              y: -10,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)'
            }}
            className='bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 w-full sm:w-80 cursor-pointer transition-all duration-300 backdrop-blur-sm'
          >

            <div className='flex flex-col items-center'>

              {/* Avatar */}
              <motion.img
                src={testimonial.image}
                alt={testimonial.name}
                className='rounded-full w-16 h-16 border-4 border-blue-600 object-cover shadow-lg'
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />

              {/* Name */}
              <h2 className='text-xl font-bold mt-4 text-gray-900'>
                {testimonial.name}
              </h2>

              {/* Role */}
              <p className='text-sm text-gray-500 font-medium'>
                {testimonial.role}
              </p>

              {/* Star Rating */}
              <motion.div
                className='flex gap-1 my-4'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {Array(testimonial.stars).fill().map((item, idx) => (
                  <motion.img
                    key={idx}
                    src={assets.rating_star}
                    alt={`Star ${idx + 1}`}
                    className='w-5 h-5'
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </motion.div>

              {/* Testimonial Text */}
              <motion.p
                className='text-gray-700 text-center text-sm leading-relaxed italic'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                "{testimonial.text}"
              </motion.p>

            </div>

          </motion.div>

        ))}

      </motion.div>

    </motion.div>
  )
}

export default Testimonials