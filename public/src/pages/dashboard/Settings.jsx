import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { FormInput, SubmitBtn } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useGlobalContext } from "../../Context";
import ChangePassword from "./ChangePassword";


const Settings = () => {
 const { user, deleteUser, logoutUser } = useGlobalContext()

 console.log(user);

 const [Modal, setModal] = useState(false)
 const [del, setdel] = useState(false)
 const handleOpen = () => {
  setModal(true)
 }

 const handleClose = () => {
  setModal(false)
 }

 const handleDeleteUser = () => {
  logoutUser()
  deleteUser()
  setModal(false)
 }

 return <section className="mb-16">
  <Form
   method="PATCH"
   className="bg-base-200 rounded-md px-8 py-4 space-y-5 " >

   <h2 className="text-xl text-center">
    edit your profile :
   </h2>

   <FormInput
    type="text"
    label="username"
    name="name"
    defaultValue={user?.name}
   />

   <FormInput
    type="email"
    label="email"
    name="email"
    defaultValue={user?.email}
   />

   <div className="form-row">
    <SubmitBtn text="edit" name="intent" value="userInfo" />
   </div>
   {/* <SubmitBtn
            text={isEdit.state ? "edit" : "add"} name="intent" value={isEdit.state ? "edit" : "add"}
         /> */}
  </Form>

  <ChangePassword user={user} />

  <div className="mt-5">
   <button
    onClick={handleOpen}
    className="btn btn-md text-md btn-error hover:bg-red-600 hover:text-white">
    delete my account
   </button>
  </div>
  {/* onClick={() => dispatch(deleteUser())} */}
  <div className={`fixed inset-0 z-50 ${Modal ? '' : 'hidden'}`}>
   <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-60">
    <div className="form-father">
     <p className='text-xl text-black'>Hello {user?.name}, Are you sure you want to delete your account ?</p>
     <div className="btn-container mt-8">
      <button
       className="btn-nc bg-red-500"
       onClick={handleDeleteUser}
      >Delete</button>
      <button
       type="button"
       onClick={handleClose}
       className="ml-4 text-gray-500 hover:text-gray-700 font-semibold"
      >Cancel</button>
     </div>
    </div>
   </div>
  </div>
 </section>
};

export default Settings;
