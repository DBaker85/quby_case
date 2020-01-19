import React, {FunctionComponent} from 'react';

import styles from './button.module.scss';

interface ButtonProps {
    onClick: ()=>void ;
}

const Button:FunctionComponent<ButtonProps> = ({children, onClick})=>{
return(
    <button className={styles['button']} onClick={onClick}>
        {children}
    </button>
)
} 

export default Button;