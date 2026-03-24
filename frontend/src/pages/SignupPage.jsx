import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (payload) => {
    setError("");
    setLoading(true);

    try {
      await signup(payload);
      navigate("/");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthForm mode="signup" onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
};

export default SignupPage;
