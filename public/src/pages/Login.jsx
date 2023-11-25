import React, { useEffect, useState } from "react";
import { Form, Link, redirect, useLocation, useNavigate, useNavigation } from "react-router-dom"
import { FormInput, SubmitBtn } from "../components";
import { useGlobalContext } from "../Context";
import { customFetch, displayToast } from "../utils";


const img = "https://i.pinimg.com/564x/0d/30/9b/0d309bbc802545f9ef289357a3179b89.jpg"
const Login = () => {
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
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await customFetch.post('/auth/login', formData);
      console.log(data.user);
      displayToast(data.msg, "success")
      setLoading(false)
      saveUser(data.user)
    } catch (error) {
      setLoading(false)
      setGood(false)
      console.log(error);
      displayToast(error.response.data.msg, "warning")
    }
  };

  if (loading) {
    return <>
      <main className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-base-300 bg-opacity-50 z-50">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </main>
    </>
  }

  return <main className="left-blue-gradient grid place-items-center px-5">
    <section className=" bg-gradient-to-r from-blue-500 -via-white to-white grid md:grid-cols-2 gap-10 rounded shadow-md shadow-black">
      <div className="p-4 place-self-center" >
        <h3 className="mb-5 text-xl">Hello, Welcome to Our Project</h3>

        <form method="POST" onSubmit={handleLogin}>
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

          <button type="submit" className="btn-nc bg-black">Login</button>

          <div className="mt-2">
            <Link to="/register" className="text-sm text-black">
              Do not have an account yet? <span className="text-white underline">Sign-up</span>
            </Link>
          </div>
        </form>

        {/* <form method="POST" onSubmit={handleLogin}>

          <FormInput
            label="Email"
            name="email"
            type="email"
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
          />

          <SubmitBtn
            text="Login"
          />
          <div className="mt-2">
            <Link to="/register" className="text-sm text-black">
              Do not have an account yet? <span className="text-white underline">Sign-up</span>
            </Link>
          </div>
        </form> */}

      </div>
      <div className="bg-white  py-5">
        <img src={img} alt="login" className="w-full" />

      </div>
    </section>

  </main >
};

export default Login;


/* 

  const { saveUser, isLoading, setIsLoading, fetchUser } = useLocalState();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [good, setGood] = useState(false);


  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = values;
    const loginUser = { email, password };
    setIsLoading(true)
    try {
      const { data } = await customFetch.post(`auth/login`, loginUser);
      setValues({ name: '', email: '', password: '' });
      setIsLoading(false);
      saveUser(data.user);

      setGood(true)
      toast.success('logged in successfully');
    } catch (error) {
      setIsLoading(false);
      setGood(false)

      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  }

  useEffect(() => {
    if (good) {
      navigate('/dashboard');
    }
  }, [good]);
*/