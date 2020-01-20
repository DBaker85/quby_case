import React, {FunctionComponent} from 'react';

import styles from './button.module.scss';

interface ButtonProps {
    onClick: ()=>void ;
    disabled?: boolean;
}

const Button:FunctionComponent<ButtonProps> = ({children, onClick, disabled})=>{
return(
    <button disabled={disabled} className={styles['button']} onClick={onClick}>
        {children}
    </button>
)
} 

export default Button;