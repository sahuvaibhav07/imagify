import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ FIX: number hona chahiye
  const [credits, setCredits] = useState(0);

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
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;