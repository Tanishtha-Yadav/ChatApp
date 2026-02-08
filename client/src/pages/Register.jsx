import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });
    setValidationError({});
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.trim().length < 3) {
      Error.fullName = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName.trim())) {
      Error.fullName = "Only letters and spaces allowed";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      Error.email = "Enter a valid email address";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      Error.mobileNumber = "Only Indian mobile numbers allowed";
    }

    if (formData.password.length < 6) {
      Error.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      Error.confirmPassword = "Passwords do not match";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Fill the form correctly");
      return;
    }

    try {
      setIsLoading(true);

      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-center mb-3 font-bold text-primary text-3xl">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {validationError.fullName && (
                <span className="text-error text-sm">
                  {validationError.fullName}
                </span>
              )}
            </div>

            {/* Email */}
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
              {validationError.email && (
                <span className="text-error text-sm">
                  {validationError.email}
                </span>
              )}
            </div>

            {/* Mobile */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Mobile Number</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {validationError.mobileNumber && (
                <span className="text-error text-sm">
                  {validationError.mobileNumber}
                </span>
              )}
            </div>

            {/* Password */}
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
              {validationError.password && (
                <span className="text-error text-sm">
                  {validationError.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {validationError.confirmPassword && (
                <span className="text-error text-sm">
                  {validationError.confirmPassword}
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${
                  isLoading ? "btn-disabled" : ""
                }`}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="link link-primary"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;