import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { plans } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BuyCredit = () => {

  const { setCredits } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // 🔥 FAKE PAYMENT FUNCTION
  const handleFakePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setCredits((prev) => prev + selectedPlan.credits);

      setLoading(false);
      setSelectedPlan(null);

      toast.success("Payment Successful 🎉");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">

      <h1 className="text-3xl font-semibold mb-6">Choose Your Plan</h1>

      <div className="flex flex-wrap justify-center gap-6">

        {plans.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 w-60">

            <p className="text-lg font-semibold">{item.id}</p>
            <p className="text-gray-500">{item.desc}</p>

            <p className="text-2xl font-bold mt-4">
              ₹{item.price}
            </p>

            <button
              onClick={() => setSelectedPlan(item)}
              className="w-full bg-black text-white mt-4 py-2 rounded"
            >
              Purchase
            </button>

          </div>
        ))}

      </div>

      {/* 🔥 FAKE PAYMENT POPUP */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-lg w-80 text-center">

            <h2 className="text-xl font-semibold mb-3">
              Confirm Payment
            </h2>

            <p className="mb-2">
              Plan: {selectedPlan.id}
            </p>

            <p className="mb-4">
              Price: ₹{selectedPlan.price}
            </p>

            <button
              onClick={handleFakePayment}
              className="w-full bg-green-600 text-white py-2 rounded mb-2"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>

            <button
              onClick={() => setSelectedPlan(null)}
              className="w-full bg-gray-300 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default BuyCredit;
