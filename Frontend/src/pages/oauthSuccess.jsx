import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../utils/auth";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }
    localStorage.setItem("token", token);

    setAuth(token);

    window.history.replaceState({}, "", "/create");
    navigate("/create");
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default OAuthSuccess;
