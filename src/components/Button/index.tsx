import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> //ordem linear

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {

    return (
        <Container {...rest} type="button"> {children} </Container>
    );
}

export default Button;