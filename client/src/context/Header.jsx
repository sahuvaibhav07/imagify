import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    const badgeVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.6 }
        }
    }

    const descriptionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.4, duration: 0.6 }
        }
    }

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.6, duration: 0.5 }
        }
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.8, duration: 0.6 }
        }
    }

    const sampleImageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 1 + index * 0.1, duration: 0.5 }
        }),
        hover: { scale: 1.1, y: -10 }
    }

    return (
        <motion.div
            className="flex flex-col justify-center items-center text-center my-20 md:my-32"
            initial="hidden"
            animate="visible"
        >
            {/* Badge */}
            <motion.div
                variants={badgeVariants}
                className="text-gray-600 inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border-2 border-gray-200 shadow-md hover:shadow-lg transition mb-6"
            >
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    ✨
                </motion.span>
                <p className="text-sm font-semibold">Best AI Text to Image Generator</p>
            </motion.div>

            {/* Main Title */}
            <motion.h1
                variants={titleVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight max-w-5xl mx-auto"
            >
                Turn text to{" "}
                <motion.span
                    className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: "100% 50%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                >
                    images
                </motion.span>
                , in seconds.
            </motion.h1>

            {/* Description */}
            <motion.p
                variants={descriptionVariants}
                className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed"
            >
                Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen. Create professional-quality images instantly.
            </motion.p>

            {/* CTA Button */}
            <motion.button
                variants={buttonVariants}
                onClick={onClickHandler}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 md:mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold rounded-full flex items-center gap-3 shadow-xl hover:shadow-2xl transition duration-300"
            >
                <span>Generate Images</span>
                <motion.img
                    className="h-6 md:h-8"
                    src={assets.star_group}
                    alt="sparkles"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </motion.button>

            {/* Sample Images Gallery */}
            <motion.div
                variants={imageVariants}
                className='flex flex-wrap justify-center mt-16 md:mt-20 gap-4 md:gap-6'
            >
                {Array(6).fill('').map((item, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={sampleImageVariants}
                        whileHover="hover"
                        className='overflow-hidden rounded-2xl shadow-lg border-2 border-white hover:border-blue-600 transition'
                    >
                        <img
                            className='aspect-square object-cover max-sm:w-16 sm:w-20 md:w-24 lg:w-28 cursor-pointer'
                            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                            alt={`Sample ${index + 1}`}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="mt-12 text-gray-500"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <p className="text-sm font-medium">Scroll down to explore</p>
                <div className="text-2xl">↓</div>
            </motion.div>
        </motion.div>
    )
}

export default Header