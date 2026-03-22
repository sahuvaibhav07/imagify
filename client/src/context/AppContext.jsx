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

  // ✅🔥 MAIN FIX (IMPORTANT)
  const generateImage = async (prompt) => {
    try {

      // ❌ credits khatam
      if (credits <= 0) {
        toast.error("No credits left!");
        navigate("/buy");
        return null;
      }

      // ✅ fake image
      const fakeImage = "https://picsum.photos/500";

      // ✅ credit minus
      setCredits((prev) => prev - 1);

      return fakeImage;

    } catch (error) {
      toast.error(error.message);
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