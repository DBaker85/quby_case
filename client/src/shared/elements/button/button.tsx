import React, {FunctionComponent} from 'react';

import styles from './button.module.scss';

interface ButtonProps {
    onClick: ()=>void ;
    disabled?: boolean;
    id?: string;
}

const Button:FunctionComponent<ButtonProps> = ({children, onClick, disabled, id})=>{
return(
    <button id={id} disabled={disabled} className={styles['button']} onClick={onClick}>
        {children}
    </button>
)
} 

export default Button;