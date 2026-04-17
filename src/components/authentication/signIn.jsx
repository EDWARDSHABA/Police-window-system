import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [badge, setBadge] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("headquarters");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!badge || !password) {
      alert("Please enter credentials");
      return;
    }

    //credentials 
    const credentials = {
      headquarters: { badge: "hq123", password: "hqpass" },
      station: { badge: "st123", password: "stpass" },
      officer: { badge: "of123", password: "ofpass" },
    };

    const validUser = credentials[role];

    if (badge === validUser.badge && password === validUser.password) {
      
      //role base navigation
      if (role === "headquarters") {
        navigate("/headquarters");
      } else if (role === "station") {
        navigate("/dashboard");
      } else if (role === "officer") {
        navigate("/officer-dashboard");
      }

    } else {
      alert("Invalid credentials for selected role");
    }
  };

  return (
    <div className="w-[380px] bg-white rounded-2xl shadow-2xl p-8 animate-scaleIn">
      
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        Sign in to continue
      </p>

      {/*role selection*/}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value="headquarters">Headquarters Admin</option>
        <option value="station">Police Station Admin</option>
        <option value="officer">Police Officer</option>
      </select>

      {/* Inputs */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Badge number / Email"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition"
      >
        LOGIN
      </button>
      
    </div>
  );
}