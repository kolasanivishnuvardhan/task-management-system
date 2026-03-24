import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ mode, onSubmit, loading, error }) => {
  const isSignup = mode === "signup";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-card">
      <h1>{isSignup ? "Create account" : "Welcome back"}</h1>
      <p>{isSignup ? "Start managing your tasks." : "Sign in to continue."}</p>

      <form onSubmit={handleSubmit} className="auth-form">
        {isSignup && (
          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            required
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Please wait..." : isSignup ? "Sign up" : "Login"}
        </button>
      </form>

      <p className="switch-link">
        {isSignup ? "Already have an account?" : "Don’t have an account?"} {" "}
        <Link to={isSignup ? "/login" : "/signup"}>{isSignup ? "Login" : "Sign up"}</Link>
      </p>
    </div>
  );
};

export default AuthForm;
