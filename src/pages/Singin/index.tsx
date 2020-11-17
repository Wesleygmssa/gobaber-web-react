import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Container, Content, Background } from './styles';

import logoimg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';

interface SignInFormData {
    email: string;
    password: string;
}

const Singin: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn, user } = useContext(AuthContext);
    console.log(user)

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            //VALIDATION
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('E-mail obrigatório'),
                password: Yup.string()
                    .required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            signIn({
                email: data.email,
                password: data.password,
            });

        } catch (err) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
            console.log(errors)
        }
    }, [signIn])

    return (
        <>
            <Container>
                <Content>
                    <img src={logoimg} alt="Gobarber" />
                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>Faça seu logon</h1>
                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />

                        <Button type="submit"> Entrar</Button>

                        <a href="/">Esqueci minha senha</a>
                    </Form>

                    <a href="/">
                        <FiLogIn />
                        Criar conta
                        </a>
                </Content>
                <Background />
            </Container>


        </>
    )
}

export default Singin; 