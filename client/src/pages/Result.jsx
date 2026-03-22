import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Result = () => {

  const navigate = useNavigate();

  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage, credits } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 🔥 MAIN FIX (redirect)
    if (credits === 0) {
      navigate("/buy");
      return;
    }

    if (!input) return;

    try {
      setLoading(true);

      const img = await generateImage(input);

      if (img) {
        setImage(img);
        setIsImageLoaded(true);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated-image.png";
    link.click();
  };

  // ✅ Generate Again
  const handleGenerateAnother = () => {
    setIsImageLoaded(false);
    setImage(assets.sample_img_1);
    setInput("");
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >

      {/* IMAGE */}
      <div className="relative">
        <img src={image} alt="" className="max-w-sm rounded" />

        {loading && (
          <p className="absolute bottom-0 w-full text-center text-blue-500">
            Loading...
          </p>
        )}
      </div>

      {/* 🔥 CONDITION */}
      {!isImageLoaded ? (

        // INPUT BOX
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-1 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none px-4"
          />

          <button className="bg-zinc-900 px-6 py-2 rounded-full">
            Generate
          </button>
        </div>

      ) : (

        // BUTTONS
        <div className="flex gap-4 mt-6">

          <button
            type="button"
            onClick={handleGenerateAnother}
            className="border px-6 py-2 rounded-full"
          >
            Generate Another
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="bg-zinc-900 text-white px-6 py-2 rounded-full"
          >
            Download
          </button>

        </div>

      )}

    </motion.form>
  );
};

export default Result;