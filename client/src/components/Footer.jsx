import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className='bg-gradient-to-b from-transparent to-gray-900 text-white mt-32 pt-16 pb-8'
    >
      <div className='px-4 sm:px-10 md:px-14 lg:px-28'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
          
          {/* Logo Section */}
          <motion.div variants={itemVariants}>
            <img src={assets.logo} alt="Imagify" width={150} className='mb-4 filter brightness-0 invert' />
            <p className='text-gray-400 text-sm'>Transform your imagination into visual art with AI-powered image generation.</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className='font-bold text-lg mb-4 text-white'>Product</h3>
            <ul className='space-y-2 text-gray-400'>
              <li><a href="#" className='hover:text-white transition'>Features</a></li>
              <li><a href="#" className='hover:text-white transition'>Pricing</a></li>
              <li><a href="#" className='hover:text-white transition'>API</a></li>
              <li><a href="#" className='hover:text-white transition'>FAQ</a></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className='font-bold text-lg mb-4 text-white'>Company</h3>
            <ul className='space-y-2 text-gray-400'>
              <li><a href="#" className='hover:text-white transition'>About</a></li>
              <li><a href="#" className='hover:text-white transition'>Blog</a></li>
              <li><a href="#" className='hover:text-white transition'>Careers</a></li>
              <li><a href="#" className='hover:text-white transition'>Contact</a></li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h3 className='font-bold text-lg mb-4 text-white'>Legal</h3>
            <ul className='space-y-2 text-gray-400'>
              <li><a href="#" className='hover:text-white transition'>Privacy</a></li>
              <li><a href="#" className='hover:text-white transition'>Terms</a></li>
              <li><a href="#" className='hover:text-white transition'>Cookies</a></li>
              <li><a href="#" className='hover:text-white transition'>License</a></li>
            </ul>
          </motion.div>

        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className='border-t border-gray-700 pt-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            
            {/* Copyright */}
            <motion.p className='text-gray-400 text-sm text-center md:text-left'>
              Copyright © 2024 Imagify. All rights reserved. | Built with passion by GreatStack Team
            </motion.p>

            {/* Social Links */}
            <motion.div 
              className='flex gap-4 items-center'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className='w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition'
              >
                <img src={assets.facebook_icon} alt="Facebook" width={24} className='filter invert' />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className='w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition'
              >
                <img src={assets.twitter_icon} alt="Twitter" width={24} className='filter invert' />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className='w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition'
              >
                <img src={assets.instagram_icon} alt="Instagram" width={24} className='filter invert' />
              </motion.a>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </motion.footer>
  )
}

export default Footer