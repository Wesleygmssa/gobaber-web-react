import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import { Container, Content, Background, AnimationContainer } from "./styles";

import logoimg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

import getValidationErrors from "../../utils/getValidationErrors";
import * as Yup from "yup";
import { useAuth } from "../../hooks/AuthContext";
import { useToast } from "../../hooks/ToastContext";
import { Link, useHistory } from "react-router-dom";

interface SignInFormData {
  email: string;
  password: string;
}

const Singin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        //VALIDATION
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("E-mail obrigatório"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push("/dashboard");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        //mensagem pelo contexto
        addToast({
          type: "error",
          title: "Erro na autenticação",
          description: "Ocorreu um erro ao fazer login",
        });
      }
    },
    [signIn, addToast, history]
  );

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={logoimg} alt="Gobarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu logon</h1>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit"> Entrar</Button>

              <Link to="/forgot-password">Esqueci minha senha</Link>
            </Form>

            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default Singin;
