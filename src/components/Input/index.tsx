import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { Container } from './styles';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { fieldName, defaultValue, error, registerField } = useField(name);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setisFilled] = useState(false);

    const handleInputBlue = useCallback(() => {
        setIsFocused(false);

        if (inputRef.current?.value) {
            setisFilled(true);
        } else {
            setisFilled(false);
        }
    }, []);



    useEffect(() => {
        registerField({

            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <Container isFilled={isFilled} isFocused={isFocused} >
            {Icon && <Icon size={20} />}

            <input

                onFocus={() => { setIsFocused(true) }}
                onBlur={handleInputBlue}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}

            />
        </Container>
    );
};

export default Input;