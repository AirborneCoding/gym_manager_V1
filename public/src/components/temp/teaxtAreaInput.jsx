const TextAreaInput = ({ name, label, defaultValue }) => {
 return (
  <div className="form-control w-full ">
   <label htmlFor={name} className="form-label">
    {label}
   </label>
   <textarea
    className="textarea textarea-bordered textarea-lg"
    name={name}
    defaultValue={defaultValue}
   />
  </div>
 );
};

export default TextAreaInput;
