import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import logoimg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';


const SingUp: React.FC = () => {

    const handleSubmit = useCallback(async (data: object) => {
        try {

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('Nome obrigatório')
                    .email('E-mail obrigatório'),
                password: Yup.string()
                    .min(6, 'No minimo 6 digitos')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <img src={logoimg} alt="Gobarber" />

                    <Form initialData={{ name: 'Wesley' }} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>

                        <Input
                            name="name"
                            icon={FiUser}
                            placeholder="Nome"

                        />

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

                        <Button type="submit"> Cadastrar</Button>

                    </Form>

                    <a href="/">
                        <FiArrowLeft />
                          Voltar para login
                        </a>
                </Content>

            </Container>


        </>
    )
}

export default SingUp; 