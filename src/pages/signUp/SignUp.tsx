// Styles
import * as S from "./SignUpStyles";
// Hooks e bibliotecas
import { useState } from "react";
import { validate } from "email-validator";
// Firebase
import { auth, db } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
// React Router Dom
import { useNavigate } from "react-router-dom";
// Components
import Error from "../../components/error/Error";

const SignUp = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const nameRegex = /^[a-zA-Z\s]+$/;

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      // Concatena o firstName e lastName em displayName
      const displayName = `${user.firstName} ${user.lastName}`;
      const formattedDisplayName = displayName
        .toLowerCase()
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(" ");

      const userData = {
        displayName: formattedDisplayName,
        email: user.email,
        avatar: "",
        contactsPendents: [],
        friends: [],
        requestSend: [],
        // outras informações adicionais do usuário...
      };

      await addDoc(collection(db, "users"), userData);
    } catch (error: any) {
      if (error.toString().includes("auth/email-already-in-use")) {
        setError("E-mail já possui cadastrado no sistema");
      } else {
        setError("Houve um erro inesperado. Tente novamente mais tarde");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (
      user.firstName === "" ||
      user.lastName === "" ||
      user.email === "" ||
      user.password === "" ||
      confirmPassword === ""
    ) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    if (user.firstName.length <= 2) {
      setError("Nome deve ter no minimo 3 caracteres");
      return;
    }
    if ((user.firstName + user.lastName).length + 1 > 30) {
      setError("O nome completo não pode ter mais de 30 caracteres");
      return;
    }
    if (!nameRegex.test(user.firstName) || !nameRegex.test(user.lastName)) {
      setError("Nome não pode ter números ou caracteres especiais");
      return;
    }
    if (!validate(user.email)) {
      setError("Formato de e-mail inválido");
      return;
    }
    if (user.password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    registerUser();
  };

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <S.FormContainer>
      <S.BackButton onClick={handleGoBack} title="Voltar a página de Login">
        <S.IconBack />
        <p>Voltar</p>
      </S.BackButton>
      <S.Form onSubmit={handleSubmit}>
        <S.Title>Cadastrar-se</S.Title>
        <S.Subtitle>Cadastro rápido e ágil</S.Subtitle>
        <S.FormRow>
          <S.FormInput
            type="text"
            placeholder="Nome"
            value={user.firstName}
            onChange={(e) => {
              setUser((prevState) => ({
                ...prevState,
                firstName: e.target.value,
              }));
              setError("");
            }}
          />
          <S.FormInput
            type="text"
            placeholder="Sobrenome"
            value={user.lastName}
            onChange={(e) => {
              setUser((prevState) => ({
                ...prevState,
                lastName: e.target.value,
              }));
              setError("");
            }}
          />
        </S.FormRow>
        <S.FormInput
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => {
            setUser((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
            setError("");
          }}
        />
        <S.FormInput
          type="password"
          placeholder="Senha"
          value={user.password}
          onChange={(e) => {
            setUser((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
            setError("");
          }}
        />
        <S.FormInput
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
        />
        {error && <Error>{error}</Error>}
        <S.SubmitButton type="submit">Registrar</S.SubmitButton>
      </S.Form>
    </S.FormContainer>
  );
};

export default SignUp;