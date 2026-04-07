import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Result = () => {

  const navigate = useNavigate();

  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage, credits } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (credits === 0) {
      toast.error("No credits left! Please buy credits to continue.");
      navigate("/buy");
      return;
    }

    if (!input.trim()) {
      toast.error("Please enter a description!");
      return;
    }

    try {
      setLoading(true);

      const img = await generateImage(input);

      if (img) {
        setImage(img);
        setIsImageLoaded(true);
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `imagify-${Date.now()}.png`;
    link.click();
    toast.success("Image downloaded successfully!");
  };

  const handleGenerateAnother = () => {
    setIsImageLoaded(false);
    setImage(assets.sample_img_1);
    setInput("");
  };

  const downloadVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-[90vh] justify-center items-center py-10 md:py-16"
    >

      {/* IMAGE CONTAINER */}
      <motion.div
        className="relative group"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300"></div>

        {/* Image */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={image.startsWith("data:") ? image : `${image}?t=${Date.now()}`}
            alt="Generated"
            className="max-w-md md:max-w-2xl rounded-2xl object-cover"
          />

          {/* Loading Overlay */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
              >
                <motion.div
                  className="w-16 h-16 border-4 border-white border-t-blue-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.p
                  className="text-white text-lg font-semibold mt-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Generating Image...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* INPUT OR ACTION BUTTONS */}
      <AnimatePresence mode="wait">
        {!isImageLoaded ? (

          // INPUT BOX
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl flex flex-col gap-4 mt-12"
          >
            <label className="text-left">
              <p className="text-sm text-gray-600 font-medium mb-3">
                Describe what you want to generate
              </p>
            </label>

            <div className="flex gap-3 bg-white rounded-full p-2 shadow-xl border-2 border-gray-200 focus-within:border-blue-600 transition">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="A futuristic city at sunset, detailed, vivid colors..."
                className="flex-1 bg-transparent outline-none px-6 py-2 text-gray-700 placeholder-gray-400"
              />

              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    Processing...
                  </span>
                ) : (
                  <>Generate</>
                )}
              </motion.button>
            </div>
          </motion.div>

        ) : (

          // ACTION BUTTONS
          <motion.div
            key="buttons"
            className="flex gap-4 mt-12 flex-wrap justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >

            <motion.button
              type="button"
              onClick={handleGenerateAnother}
              className="btn-secondary px-8 py-3 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Generate Another
            </motion.button>

            <motion.button
              type="button"
              onClick={handleDownload}
              className="btn-primary px-8 py-3 font-semibold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Download Image</span>
              <span>↓</span>
            </motion.button>

          </motion.div>

        )}
      </AnimatePresence>

    </motion.form>
  );
};

export default Result;