import Proptypes from 'prop-types'

const Button = ({ text, type, background, textColor }) => {
  return (
    <button 
        type={type}
        className={`my-4 mx-auto block py-1 px-4 rounded ${background} ${textColor} text-sm hover:opacity-85 transition-opacity duration-300 lg:text-md`}
    >
        {text}
    </button>
  )
}

Button.propTypes = {
    text: Proptypes.string,
    type: Proptypes.string,
    background: Proptypes.string,
    textColor: Proptypes.string,
}

export default Button