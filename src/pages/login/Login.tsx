// Styles
import * as S from "./LoginStyles";
import { Button } from "../../styles/Button";
// Firebase
import { provider, auth, db } from "../../services/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
// Icons
import { FcGoogle } from "react-icons/fc";
// Hooks
import { useState } from "react";
import { useImportedGoogleUsersContext } from "../../contexts/ImportedGoogleUsersProvider";
// React Router Dom
import { useNavigate } from "react-router-dom";
// Components
import Error from "../../components/error/Error";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setImportedGoogleUsers } = useImportedGoogleUsersContext();

  const handleCreateAccount = () => {
    navigate("/register");
  };

  // Função para fazer o login com o Google
  const handleSignInGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const { displayName, email } = user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          displayName: displayName || email,
          email: email,
          avatar: "",
          contactsPendents: [],
          friends: [],
          requestSend: [],
        });
        setImportedGoogleUsers(true);
      }
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
    }
  };

  // Login com e-mail e senha
  const handleSignIn = async () => {
    if (!user.email && !user.password) {
      setError("Por favor, preencha todos os campos");
      return;
    } else if (!user.email) {
      setError("Por favor, preencha seu e-mail");
      return;
    } else if (!user.password) {
      setError("Por favor, preencha sua senha");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("Usuário não encontrado. Verifique seu e-mail.");
      } else if (error.code === "auth/wrong-password") {
        setError("Senha incorreta. Tente novamente.");
      } else if (error.code === "auth/invalid-email") {
        setError("E-mail inválido. Verifique seu e-mail.");
      } else {
        setError("Erro ao fazer login. Tente novamente mais tarde.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <S.Container>
      <S.Greeting>
        <h1>Social Vibe</h1>
        <p>Estamos aqui para te ajudar</p>
        <p>a compartilhar a sua vibe</p>
        <p>com o mundo. Venha com a gente!</p>
      </S.Greeting>

      <S.Login>
        <S.LoginForm onSubmit={handleSubmit}>
          <h2>Login</h2>
          <S.LoginInput
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
              setError("");
            }}
            id="login-input"
          />

          <S.LoginInput
            type="password"
            placeholder="Senha"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
              setError("");
            }}
          />

          {error && <Error>{error}</Error>}

          <S.LoginButtonContainer>
            <Button
              backgroundcolor="#4239c5"
              color="#FFF"
              hoverbackgroundcolor="#f50057"
              width="350px"
              type="submit"
            >
              Entrar
            </Button>
          </S.LoginButtonContainer>
          
          <S.SignUpContainer>
            <S.SignUp>
              <Button
                backgroundcolor="#36A420"
                color="#FFF"
                hoverbackgroundcolor="#f50057"
                width="200px"
                onClick={handleCreateAccount}
              >
                Criar nova conta
              </Button>
            </S.SignUp>
          </S.SignUpContainer>
        </S.LoginForm>

        <S.SignInGoogle>
          <p>Ou</p>
          <p></p>
          <S.SignInGoogleButton onClick={handleSignInGoogle}>
            <FcGoogle size={20} /> <span>Login com Google</span>
          </S.SignInGoogleButton>
        </S.SignInGoogle>
      </S.Login>
    </S.Container>
  );
};

export default Login;
