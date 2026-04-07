import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const History = () => {
  const { imageHistory, deleteHistoryItem, clearHistory, downloadHistoryImage, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Filter history based on search
  const filteredHistory = imageHistory.filter(item =>
    item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort history
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortBy === "oldest") {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortBy === "alphabetical") {
      return a.prompt.localeCompare(b.prompt);
    }
    return 0;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 md:py-16 px-4"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="inline-block text-blue-600 font-semibold text-sm mb-4 px-4 py-2 bg-blue-100 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          📸 Your Gallery
        </motion.span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Image History
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse and manage all your previously generated images
        </p>
      </motion.div>

      {/* Empty State */}
      {imageHistory.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📷
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">No Images Yet</h2>
          <p className="text-gray-600 text-center max-w-md mb-8">
            Start generating amazing images and they'll appear here. Your history will help you revisit your creations!
          </p>
          <motion.button
            onClick={() => navigate("/result")}
            className="btn-primary px-8 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Generate Your First Image
          </motion.button>
        </motion.div>
      ) : (
        <>
          {/* Controls */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="flex-1 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search images by prompt..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:border-blue-600 outline-none transition"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 border-2 border-gray-300 rounded-full focus:border-blue-600 outline-none transition bg-white cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Alphabetical</option>
              </select>

              {/* Clear All */}
              <motion.button
                onClick={() => {
                  if (window.confirm("Are you sure? This will clear all history.")) {
                    clearHistory();
                  }
                }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear All
              </motion.button>
            </div>

            {/* Results Count */}
            <motion.p
              className="text-gray-600 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Showing {sortedHistory.length} of {imageHistory.length} images
            </motion.p>
          </motion.div>

          {/* Image Grid */}
          {sortedHistory.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {sortedHistory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    exit="exit"
                    className="group"
                  >
                    <motion.div
                      className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-blue-600 transition"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedImage(item)}
                    >
                      {/* Image Container */}
                      <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
                        <motion.img
                          src={item.image.startsWith("data:") ? item.image : `${item.image}?t=${Date.now()}`}
                          alt={item.prompt}
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />

                        {/* Overlay on Hover */}
                        <motion.div
                          className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadHistoryImage(item.image, item.prompt);
                            }}
                            className="p-3 bg-green-600 hover:bg-green-700 rounded-full text-white transition"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            title="Download"
                          >
                            ↓
                          </motion.button>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm("Delete this image from history?")) {
                                deleteHistoryItem(item.id);
                              }
                            }}
                            className="p-3 bg-red-600 hover:bg-red-700 rounded-full text-white transition"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            title="Delete"
                          >
                            🗑️
                          </motion.button>
                        </motion.div>
                      </div>

                      {/* Prompt and Date */}
                      <div className="p-4 bg-white">
                        <motion.p
                          className="text-sm text-gray-700 line-clamp-2 font-medium mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.prompt}
                        </motion.p>
                        <motion.p
                          className="text-xs text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {item.date} at {item.time}
                        </motion.p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-gray-600">No images match your search.</p>
            </motion.div>
          )}
        </>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full text-white flex items-center justify-center font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>

              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <motion.div className="flex-1 bg-gray-900 flex items-center justify-center min-h-96 md:min-h-full">
                  <img
                    src={selectedImage.image.startsWith("data:") ? selectedImage.image : `${selectedImage.image}?t=${Date.now()}`}
                    alt={selectedImage.prompt}
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Details */}
                <motion.div
                  className="flex-1 p-8 bg-white flex flex-col justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>

                    <div className="space-y-4 mb-8">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold mb-2">Prompt</p>
                        <p className="text-gray-900 text-base leading-relaxed bg-gray-100 p-4 rounded-lg">
                          {selectedImage.prompt}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 font-semibold mb-2">Date</p>
                          <p className="text-gray-900">{selectedImage.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold mb-2">Time</p>
                          <p className="text-gray-900">{selectedImage.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => {
                        downloadHistoryImage(selectedImage.image, selectedImage.prompt);
                        setSelectedImage(null);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Download
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        if (window.confirm("Delete this image?")) {
                          deleteHistoryItem(selectedImage.id);
                          setSelectedImage(null);
                        }
                      }}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default History;
