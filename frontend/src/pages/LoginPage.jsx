import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (payload) => {
    setError("");
    setLoading(true);

    try {
      await login({ email: payload.email, password: payload.password });
      navigate("/");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthForm mode="login" onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
};

export default LoginPage;
