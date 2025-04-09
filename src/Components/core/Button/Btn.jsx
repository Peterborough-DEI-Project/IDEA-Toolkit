import {Button} from 'flowbite-react'
import PropTypes from "prop-types";

Btn.propTypes = {
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(["default", "outline"]),
    children: PropTypes.any,
}

function Btn({children, onClick, variant="default"}) {
    return (
        <Button onClick={onClick}
                className={`h-10 font-semibold text-lg appearance-none 
                    inline-flex justify-center items-center gap-3 px-4  rounded-lg
                    transition-colors duration-150 ease-in-out
                     active:ring-violet-500 active:ring-1
                    ${variant === 'outline' ? 'border hover:border-violet-600 bg-none hover:text-violet-600 text-blue-600 border-blue-600 bg-white' : ' text-white  bg-gradient-to-br from-blue-600 to-violet-600 hover:from-blue-600 hover:text-white hover:to-violet-600 transition-[background-position] duration-[250ms] ease-out bg-[length:200%_200%] bg-[position:50%_50%] hover:bg-[position:100%_100%]'}
                `}>

            {children}
        </Button>
    );
}

export default Btn;