// Styles
import { Button } from "../../styles/Button";
import * as S from "./NotFoundStyles";
// React Router Dom
import { useNavigate, useLocation } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(location.state?.from || '/');
  };

  return (
    <S.NotFoundContainer>
      <S.NotFoundHeading>Erro 404</S.NotFoundHeading>
      <S.NotFoundText>Página não encontrada</S.NotFoundText>
      <S.Icon />
      <Button
        backgroundcolor="#1877F2"
        color="white"
        width="350px"
        hoverbackgroundcolor="#0762da"
        onClick={handleGoBack}
      >
        Voltar
      </Button>
    </S.NotFoundContainer>
  );
};

export default NotFound;
