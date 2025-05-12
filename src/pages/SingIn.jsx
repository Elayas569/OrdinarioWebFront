import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const SingIn = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const API = import.meta.env.VITE_API_URL;
  const SIGNIN_URL = `${API}/auth/signin`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await fetch(SIGNIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Success:", data);
        alert("Login successful!");

        // Use the login function from context to update global state
        login(data.token); // Assuming the token is returned in the response

        navigate("/"); // Redirect to home page or dashboard
      } else {
        alert(data.message || "Sign in failed. Please try again.");
        console.error("Error:", data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("A network error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border-0 p-3 rounded-lg bg-white"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border-0 p-3 rounded-lg bg-white"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Sign in
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>¿No tienes cuenta?</p>
        <span
          className="text-blue-700 cursor-pointer"
          onClick={() => {
            navigate("/sing-up"); // Make sure this route is correctly defined
          }}
        >
          Regístrate
        </span>
      </div>
    </div>
  );
};

export default SingIn;
