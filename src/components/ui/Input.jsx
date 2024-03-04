import PropTypes from 'prop-types'
import { forwardRef } from 'react';

const Input = forwardRef(function Input(props, ref) {
  const { label, type, placeholder, isRequired } = props;
  return (
    <label className="flex flex-col justify-center items-center text-sm lg:text-md">
      {label}
      
      <input         
        type={type}
        ref={ref}   
        placeholder={placeholder}
        required={isRequired}
        className="my-1 mx-auto block max-w-[300px] box-border py-1 px-2 border border-gray-300 rounded-md text-sm placeholder:text-xs lg:text-md lg:placeholder:text-md"
        />
    </label>
  );
});

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool
}

export default Input