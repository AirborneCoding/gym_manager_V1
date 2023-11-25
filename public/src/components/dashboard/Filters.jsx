import React, { useState } from "react";
import { Form, Link, useLoaderData } from "react-router-dom"
import { SearchInput, SelectInput, CheckboxInput, SubmitBtn } from "../index"
import {
 getStaticgender,
 getUniqueGender,
 getStaticMembershipType,
 getUniqueMembershipType,
 membershipTypeArray
} from "../../utils"

const Filters = () => {
 const { params, clients } = useLoaderData();
 const { search, gender, membershipType, sort, isMonthEnd, plan } = params;
 console.log(params);
 const membersType = getUniqueMembershipType(membershipTypeArray)
 // const genders = getUniqueStatus(statusArray)
 const [name, setName] = useState("")
 return <Form
  method="GET"
  className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6 items-center">

  <SearchInput
   label="Search Task"
   name="search"
   defaultValue={search}
  />

  <SelectInput
   name="gender"
   label="gender"
   list={['all', 'Male', 'Female']}
   defaultValue={gender}
  />

  <SelectInput
   name="membershipType"
   label="membershipType"
   list={membersType}
   defaultValue={membershipType}
  />

  <SelectInput
   name="plan"
   label="plan"
   list={['all', 'month', '3 month', "6 month", "year"]}
   defaultValue={plan}
  />

  <SelectInput
   label='Is Month End'
   name='isMonthEnd'
   defaultValue={isMonthEnd}
   list={['all', 'Members', , 'memberShip End']}

  />

  <SelectInput
   name="sort"
   label="sort By"
   list={['a-z', 'z-a', 'latest', 'oldest']}
   defaultValue={sort}
  />

  <div className="form-row"></div>
  <button type='submit' className='btn btn-primary btn-xs '>
   search
  </button>
  <Link to='/dashboard/all-clients' className='btn btn-accent btn-xs'>
   reset
  </Link>

 </Form>;
};

export default Filters;
