import React, {FunctionComponent} from 'react';

interface ButtonProps {
    onClick: ()=>void ;
}

const Button:FunctionComponent<ButtonProps> = ({children, onClick})=>{
return(
    <button onClick={onClick}>
        {children}
    </button>
)
} 

export default Button;