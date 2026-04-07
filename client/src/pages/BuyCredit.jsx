import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { plans } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const BuyCredit = () => {

  const { setCredits, user } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleFakePayment = () => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setCredits((prev) => prev + selectedPlan.credits);
      setLoading(false);
      setSelectedPlan(null);
      toast.success(`🎉 ${selectedPlan.credits} credits added to your account!`);
      navigate("/result");
    }, 2000);
  };

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[90vh] py-16 md:py-24"
    >

      {/* Header */}
      <motion.div
        className='text-center mb-16'
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
          Pricing Plans
        </motion.span>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          Choose Your Plan
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Generate unlimited professional images with our flexible pricing plans
        </p>
      </motion.div>

      {/* Plans Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-8 px-4"
      >

        {plans.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              y: -10,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
            }}
            className='relative bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-3xl p-8 w-full sm:w-80 border border-gray-200 overflow-hidden'
          >

            {/* Ribbon for Popular Plan */}
            {index === 1 && (
              <motion.div
                className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                POPULAR
              </motion.div>
            )}

            {/* Plan Name */}
            <motion.p
              className="text-2xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {item.id}
            </motion.p>

            {/* Plan Description */}
            <motion.p
              className="text-gray-600 mb-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {item.desc}
            </motion.p>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Credits */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-600 text-sm mb-2">Credits</p>
              <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                {item.credits}
              </p>
            </motion.div>

            {/* Price */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-5xl font-bold text-gray-900 mb-2">
                ₹{item.price}
              </p>
              <p className="text-gray-600 text-sm">
                ₹{(item.price / item.credits).toFixed(2)} per credit
              </p>
            </motion.div>

            {/* Features List */}
            <motion.ul
              className="space-y-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                {item.credits} image generations
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                High-quality output
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Commercial use allowed
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                30-day expiry
              </li>
            </motion.ul>

            {/* Purchase Button */}
            <motion.button
              onClick={() => {
                if (!user) {
                  toast.error("Please login first!");
                  return;
                }
                setSelectedPlan(item);
              }}
              className={`w-full py-3 rounded-2xl font-bold transition-all duration-300 ${
                index === 1
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-900 hover:bg-blue-600 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Choose Plan
            </motion.button>

          </motion.div>
        ))}

      </motion.div>

      {/* Trust Badges */}
      <motion.div
        className="flex justify-center gap-8 mt-16 flex-wrap text-center text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div>
          <p className="font-bold text-2xl text-gray-900">100%</p>
          <p className="text-sm">Secure Payment</p>
        </div>
        <div>
          <p className="font-bold text-2xl text-gray-900">24/7</p>
          <p className="text-sm">Customer Support</p>
        </div>
        <div>
          <p className="font-bold text-2xl text-gray-900">30 Days</p>
          <p className="text-sm">Money Back</p>
        </div>
      </motion.div>

      {/* Payment Confirmation Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => !loading && setSelectedPlan(null)}
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl w-full max-w-md shadow-2xl border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >

              <motion.h2
                className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Confirm Purchase
              </motion.h2>

              {/* Order Details */}
              <motion.div
                className="bg-gray-100 p-4 rounded-2xl mb-6 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between">
                  <span className="text-gray-700">Plan:</span>
                  <span className="font-bold">{selectedPlan.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Credits:</span>
                  <span className="font-bold text-blue-600">{selectedPlan.credits}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between">
                  <span className="text-gray-700 font-semibold">Total Price:</span>
                  <span className="text-2xl font-bold text-gray-900">₹{selectedPlan.price}</span>
                </div>
              </motion.div>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setSelectedPlan(null)}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-bold hover:bg-gray-100 transition disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handleFakePayment}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Processing...
                    </span>
                  ) : (
                    'Pay Now'
                  )}
                </motion.button>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default BuyCredit;
