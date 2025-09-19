import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp(Props) {

    const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    denomination: "",
    contact: "",
    role: "organization"
  });

  useEffect(() => {
    // no DOM addEventListener needed now
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important for cookies/session
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      // save user + org to parent state/context
      Props.setUser({ ...data.user, organization: data.organization });
      navigate("/host");
    } else {
      alert("Signup failed");
    }
  };


    return(
        <>
        <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
            
    <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
      Register your Organization
    </h1>
{/* <hr className="block w-full -mx-8 border-t-2 my-4"></hr> */}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="church@example.com"/>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="********"/>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="********"/>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm text-gray-700">Organization Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Grace Chapel"/>
      </div>

      <div>
        <label htmlFor="denomination" className="block text-sm text-gray-700">Denomination</label>
        <input
          type="text"
          id="denomination"
          name="denomination"
          className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Pentecostal"/>
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm text-gray-700">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="0241234567"/>
      </div>

      <input type="hidden" name="role" value="organization"/>
        <p className="text-xs text-gray-500 text-center">By selecting <b className="text-[#DE846A]">Agree & Continue</b>, I confirm that I have the right authority from my organization to Signup/Login to an account on <b className="text-[#DE846A]">OpenSanctuary</b></p>
      <button
        type="submit"
        className="w-full mt-2 bg-[#E19179] hover:bg-[#DE846A] text-white font-semibold py-2 px-4 rounded-lg transition-colors">
       Agree & Continue
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?
        <a href="/login" className="text-indigo-600 hover:underline">Log in</a>
      </p>
    </form>
  </div>     
        </div>

     </>
    )
}