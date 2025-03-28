import PropTypes from "prop-types";

Description.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
    size: PropTypes.oneOf(["md", "lg"]),
};

function Description({ value, onChange, placeholder, size = "lg" }) {
  return (
      <div className={`w-full  ${size === "md" ? "h-11" : "h-12 "}  flex items-center `}>
        <input
            onChange={onChange}
            value={value}
            placeholder={placeholder || "Title"}
            type="text" id="first_name"
            className={`
            ${size === "md" ? "text-base " : "text-lg"}
            w-fit flex-grow bg-none border-0  text-gray-800 cursor-pointer  font-normal rounded-lg
              focus:border focus:border-blue-500 focus:cursor-auto  focus:bg-gray-100   dark:bg-gray-700 hover:bg-gray-100
             dark:placeholder-gray-800  dark:text-white   transition-colors duration-200 ease-in-out`}
        />
      </div>
  );
}

export default Description;
