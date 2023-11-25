import React, { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom"
// components
import { SelectInput, CheckboxInput, SubmitBtn, FormInput, DateInput } from "../../components/index"
// utilss

import { useDispatch, useSelector } from "react-redux";


const Add = () => {

   const { isEdit } = useSelector(state => state.clients)

   const ClientInfo = isEdit.item
   // 'month', '3 month', "6 month", "year"

   return <section className="">
      <Form
         method={isEdit.state ? "PATCH" : "POST"}
         className="bg-base-200 rounded-md px-8 py-4 space-y-5 grid lg:grid-cols-2 gap-8" >
         <input type="hidden" name="clientID" value={isEdit.state ? isEdit.id : ""} />

         <FormInput
            name="name"
            label="name"
            defaultValue={isEdit.state ? ClientInfo?.name : ""}
         />

         <SelectInput
            name="gender"
            label="gender"
            list={['Male', 'Female']}
            defaultValue={isEdit.state ? ClientInfo?.gender : ""}
         />

         <SelectInput
            name="membershipType"
            label="membershipType"
            list={['Musculation', 'Musculation + Cardio', "Cardio"]}
            defaultValue={isEdit.state ? ClientInfo?.membershipType : ""}
         />

         <SelectInput
            name="plan"
            label="plan"
            list={['month', '3 month', "6 month", "year"]}
            defaultValue={isEdit.state ? ClientInfo?.plan : ""}
         />

         {
            isEdit.state && (
               <CheckboxInput
                  name="isMonthEnd"
                  label="Month End"
                  defaultValue={isEdit.state ? ClientInfo?.isMonthEnd : false}
               />
            )
         }
         <SubmitBtn
            text={isEdit.state ? "edit" : "add"} name="intent" value={isEdit.state ? "edit" : "add"}
         />
      </Form>
   </section>


};

export default Add;
