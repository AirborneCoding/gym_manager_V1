const FormInput = ({ label, name, type, defaultValue, value, handleChange }) => {
 return (
  <div className='form-control'>
   <label htmlFor={name} className='label'>
    <span className='label-text capitalize'>{label}</span>
   </label>
   <input
    type={type}
    name={name}
    defaultValue={defaultValue}
    value={value}
    onChange={handleChange}
    className='input input-bordered input-sm '
   />
  </div>
 );
};
export default FormInput;
