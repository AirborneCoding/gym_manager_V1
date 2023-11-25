const SearchInput = ({ name, label, defaultValue }) => {
 return <div className="form-control w-full">
  <label htmlFor="" className="form-label">
   {label}
  </label>
  <input
   type="search"
   className="input input-bordered input-xs"
   name={name}
   defaultValue={defaultValue}
  />
 </div>;
};

export default SearchInput;
