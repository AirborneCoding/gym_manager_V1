import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { customFetch, displayToast } from "../utils";

const LoginV2 = () => {

 const { saveUser } = useGlobalContext()
 const [loading, setLoading] = useState(false)
 const [good, setGood] = useState(false)
 const [formData, setFormData] = useState({
  email: '',
  password: '',
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
   ...formData,
   [name]: value,
  });
 };

 const navigate = useNavigate()

 const handleLogin = async (e) => {
  e.preventDefault()
  setLoading(true)
  try {
   const { data } = await customFetch.post('/auth/login', formData);
   console.log(data.user);
   displayToast(data.msg, "success")
   setLoading(false)
   saveUser(data.user)
   setGood(true)
  } catch (error) {
   setGood(false)
   setLoading(false)
   console.log(error);
  }
 }

 useEffect(() => {
  if (good) {
   navigate("/dashboard")
  }
 }, [good])

 return <form className="form-father" onSubmit={handleLogin}>
  <div className="form-row">
   <label className="form-label" htmlFor="email">Email</label>
   <input
    className="form-input"
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
   />
  </div>

  <div className="form-row">
   <label className="form-label" htmlFor="password">Password</label>
   <input
    className="form-input"
    type="password"
    id="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
   />
  </div>

  <button type="submit" disabled={loading} className="btn-nc bg-black">{!loading ? "Login" : "Loading..."}</button>

  <div className="mt-2">
   <Link to="/register" className="text-sm text-black">
    Do not have an account yet? <span className="text-blue-500 underline">Sign-up</span>
   </Link>
  </div>
 </form>;
};

export default LoginV2;
