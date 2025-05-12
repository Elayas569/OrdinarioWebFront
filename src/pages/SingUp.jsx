import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const SIGNUP_URL = `${API}/auth/signup`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state

    try {
      const res = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Success:", data);
        alert("User created successfully!");

        // Reset the form data after successful sign-up
        setFormData({});
        navigate("/sign-in");
      } else {
        if (data.message === "Username or email already exists") {
          alert(
            "The username or email is already taken. Please choose another."
          );
        } else {
          alert("Signup failed. Please try again.");
        }
        console.error("Error:", data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("A network error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border-0 p-3 rounded-lg bg-white"
          id="username"
          onChange={handleChange}
          value={formData.username || ""}
        />
        <input
          type="email"
          placeholder="Email"
          className="border-0 p-3 rounded-lg bg-white"
          id="email"
          onChange={handleChange}
          value={formData.email || ""}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-0 p-3 rounded-lg bg-white"
          id="password"
          onChange={handleChange}
          value={formData.password || ""}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <span
          className="text-blue-700 cursor-pointer"
          onClick={() => {
            navigate("/sing-in");
          }}
        >
          Sign in
        </span>
      </div>
    </div>
  );
};

export default SingUp;
