import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> //ordem linear

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {

    return (
        <Container
            type="button"
            {...rest}
        >
            {children}
        </Container>
    );
}

export default Button;






