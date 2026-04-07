import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [credits, setCredits] = useState(0);
  const [imageHistory, setImageHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("imageHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  // 🔥 OPTIONAL (backend use kare to rehne de)
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/users/credits",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setCredits(data.credits);
        setUser(data.user);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅🔥 Main generator implementation
  const generateImage = async (prompt) => {
    try {
      if (!prompt || !prompt.trim()) {
        toast.error("Please enter a valid prompt.");
        return null;
      }

      if (credits <= 0) {
        toast.error("No credits left!");
        navigate("/buy");
        return null;
      }

      if (!token) {
        toast.error("Please login before generating images.");
        setShowLogin(true);
        return null;
      }

      const { data } = await axios.post(
        backendUrl + "/api/images/generate-image",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success || !data.resultImage) {
        toast.error(data.message || "Failed to generate image.");
        return null;
      }

      // sync credit state with backend
      if (typeof data.creditBalance === "number") {
        setCredits(data.creditBalance);
      } else {
        setCredits((prev) => prev - 1);
      }

      // Add image to history
      const newHistoryItem = {
        id: Date.now(),
        prompt,
        image: data.resultImage,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };

      const updatedHistory = [newHistoryItem, ...imageHistory];
      setImageHistory(updatedHistory);
      localStorage.setItem("imageHistory", JSON.stringify(updatedHistory));

      return data.resultImage;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Image generation error");
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully!");
  };

  // History management functions
  const deleteHistoryItem = (id) => {
    const updated = imageHistory.filter(item => item.id !== id);
    setImageHistory(updated);
    localStorage.setItem("imageHistory", JSON.stringify(updated));
    toast.success("Image removed from history");
  };

  const clearHistory = () => {
    setImageHistory([]);
    localStorage.setItem("imageHistory", JSON.stringify([]));
    toast.success("History cleared");
  };

  const downloadHistoryImage = (image, prompt) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `imagify-${prompt.slice(0, 20)}-${Date.now()}.png`;
    link.click();
    toast.success("Image downloaded!");
  };

  useEffect(() => {
    if (token) {
      loadCreditsData(); // rehne de, problem nahi
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credits,
    setCredits,
    backendUrl,
    loadCreditsData,
    logout,
    generateImage,
    imageHistory,
    setImageHistory,
    deleteHistoryItem,
    clearHistory,
    downloadHistoryImage,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;