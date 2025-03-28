import { TextInput } from "flowbite-react";


import PropTypes from "prop-types";

Title.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
    size: PropTypes.oneOf(["md", "lg"]),
};




function Title({ value, onChange, placeholder, size, error, helperText }) {
  return (
      <div className={`w-full  ${size === "md" ? "h-14" : "h-16 "}  flex flex-col justify-center  `}>
      <input
          onChange={onChange}
          value={value}
          placeholder={placeholder || "Title"}
          type="text" id="first_name"
             className={`
              ${ size ==="md" ? "text-2xl" : "text-3xl"}
            ${error ? "border border-red-300" : "border-gray-300 border-0 border-opacity-0"}
              cursor-pointer 
              flex-grow bg-none    text-gray-900  font-semibold rounded-lg
              focus:border focus:cursor-auto focus:border-blue-500 focus:bg-gray-100  dark:bg-gray-700 hover:bg-gray-100
             dark:placeholder-gray-800  dark:text-white   transition-colors duration-200 ease-in-out`}
            />
          {
              error && <span className="text-sm ml-1  font-semibold mt-1  text-red-600">Required</span>
          }
      </div>
)
    ;
}

export default Title;
