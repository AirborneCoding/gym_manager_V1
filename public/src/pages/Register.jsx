import React from "react";
import { Form, Link } from "react-router-dom"
import { FormInput, SubmitBtn } from "../components";

const img = "https://i.pinimg.com/564x/0d/30/9b/0d309bbc802545f9ef289357a3179b89.jpg"
const Register = () => {
 return <main className="left-blue-gradient grid place-items-center px-5">
  <section className="bg-gradient-to-r from-blue-500 -via-white to-white grid md:grid-cols-2 gap-10 rounded shadow-md shadow-black">
   <div className="p-4 place-self-center">
    <h3 className="mb-5 text-xl">Hello, Welcome to Our Project</h3>
    <Form method="POST">
     <FormInput
      label="name"
      name="name"
     />

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
      text="Register"
     />
     <div className="mt-2 ">
      <Link to="/login" className="text-sm text-black">
       Already have an account yet? <span className="text-white underline">Sign-in</span>
      </Link>
     </div>
    </Form>

   </div>
   <div className="bg-white py-5">
    <img src={img} alt="Register" className="w-full" />

   </div>
  </section>

 </main >
};

export default Register;
