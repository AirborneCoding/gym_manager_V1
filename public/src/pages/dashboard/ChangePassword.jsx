import React from "react";
import { Form } from "react-router-dom";
import { FormInput, SubmitBtn } from "../../components";

const ChangePassword = ({ user }) => {
 return <Form method="PUT" className="my-8 bg-base-200 rounded-md px-8 py-4 space-y-5">
  <h2 className="text-xl text-center">
   change your password :
  </h2>

  <FormInput
   type="text"
   label="old Password :"
   name="oldPassword"
  />

  <FormInput
   type="text"
   label="new Password :"
   name="newPassword"
  />

  <div className="form-row">
   <SubmitBtn text="change" name="intent" value="userPassword" />
  </div>

 </Form>;
};

export default ChangePassword;
