import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    >

      {/* Header */}
      <motion.div
        className='text-center mb-12'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h1 className='text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          Create AI Images
        </h1>
        <p className='text-lg text-gray-600'>Turn your imagination into visuals with cutting-edge AI technology</p>
      </motion.div>

      <div className='flex flex-col gap-8 md:gap-14 md:flex-row items-center'>
        {/* Image Section */}
        <motion.div
          variants={imageVariants}
          className='flex-1'
        >
          <motion.div
            className='relative'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-2xl'></div>
            <motion.img
              src={assets.sample_img_1}
              alt="AI Generated Sample"
              className='relative w-full rounded-3xl shadow-2xl border-4 border-white'
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={textVariants}
          className='flex-1'
        >
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
            Introducing the AI-Powered Text to Image Generator
          </h2>

          <motion.p
            className='text-gray-700 text-lg mb-4 leading-relaxed'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Easily bring your idea to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
          </motion.p>

          <motion.p
            className='text-gray-700 text-lg mb-8 leading-relaxed'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
          </motion.p>

          {/* Features List */}
          <motion.div
            className='space-y-3'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              "Ultra-fast image generation",
              "High-quality AI-powered results",
              "Unlimited creative possibilities",
              "Easy to use interface"
            ].map((feature, index) => (
              <motion.div
                key={index}
                className='flex items-center gap-3'
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className='w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'
                  whileHover={{ scale: 1.5 }}
                />
                <p className='text-gray-700 font-medium'>{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>

    </motion.div>
  )
}

export default Description