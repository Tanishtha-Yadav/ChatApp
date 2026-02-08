import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useGoogleAuth } from "../config/GoogleAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();

  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();

  const handleGoogleSuccess = async (userData) => {
    console.log("Google Login Data", userData);
  };

  const GoogleLogin = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address";
    }

    if (!formData.password) {
      return "Password is required";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", formData);

      toast.success(res.data.message);

      // OPTIONAL: store user
      sessionStorage.setItem("ChatKaro", JSON.stringify(res.data.data));

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ email: "", password: "" });
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-center mb-3 font-bold text-primary text-3xl">
            Login
          </h2>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className={`btn btn-primary flex-1 ${
                  loading ? "btn-disabled" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <button
                type="button"
                className="btn btn-outline flex-1"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="mt-4">
            {error ? (
              <button
                className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 w-full"
                disabled
              >
                <FcGoogle className="text-xl" />
                {error}
              </button>
            ) : (
              <button
                onClick={GoogleLogin}
                className="btn btn-outline font-sans flex items-center justify-center gap-2 w-full"
                disabled={!isInitialized || isLoading}
              >
                <FcGoogle className="text-xl" />
                {isLoading
                  ? "Loading..."
                  : isInitialized
                    ? "Continue with Google"
                    : "Google Auth Error"}
              </button>
            )}
          </div>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="link link-primary"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;