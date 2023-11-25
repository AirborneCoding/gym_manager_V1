import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const currentDate = new Date().toISOString().split('T')[0];

const DateInput = ({ label, name }) => {
 // Get the current date
 const currentDate = new Date();

 return (
  <div className='form-control w-full'>
   <label className='label'>
    <span className='label-text capitalize'>{label}</span>
   </label>
   <DatePicker
    selected={currentDate} 
    name={name}
    className='input input-bordered input-sm'
    dateFormat='MM/dd/yyyy'
    readOnly
   />
  </div>
 );
};

export default DateInput;
