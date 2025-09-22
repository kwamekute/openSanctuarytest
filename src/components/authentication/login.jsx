// src/components/authentication/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
       e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send/receive cookies for session
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setUser({ ...data.account, organization: data.organization });
        console.log(data);
        navigate("/host");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Login 
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="church@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="********"
            />
          </div>


          {/* hidden role
          <input type="hidden" name="role" value="organization" /> */}

          <p className="text-xs text-gray-500 text-center">
            By selecting <b className="text-[#DE846A]">Agree & Continue</b>, I confirm that I have the right authority from my organization to Signup/Login to an account on <b className="text-[#DE846A]">OpenSanctuary</b>
          </p>

          <button
            type="submit"
            className="w-full mt-2 bg-[#E19179] hover:bg-[#DE846A] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Agree & Continue
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?
            <a onClick={() => navigate('/signup')} className="text-indigo-600 hover:underline cursor-pointer">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
