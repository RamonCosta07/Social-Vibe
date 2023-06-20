// Styles
import * as S from "./ModalDeleteStyles";
// Hooks
import { useState, useEffect } from "react";
// Interface
import { IModalDeleteProps } from "../../interfaces/IComponents/IModalDelete";

const ModalDelete = ({
  msg,
  handleConfirmDelete,
  handleCancelDelete,
  secondsRemaining,
}: IModalDeleteProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [remaining, setRemaining] = useState(secondsRemaining || 0);

  useEffect(() => {
    if (remaining !== 0) {
      const intervalId = setInterval(() => {
        setRemaining((prevRemaining) => prevRemaining - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
    setIsButtonDisabled(false);
  }, [remaining]);

  return (
    <S.ModalContainer>
      <S.ModalContent>
        <p>{msg}</p>
        <S.ModalButtonsContainer>
          {secondsRemaining ? (
            <S.ConfirmButton
              onClick={handleConfirmDelete}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? `(${remaining}) segundos` : "Confirmar"}
            </S.ConfirmButton>
          ) : (
            <S.ConfirmButton onClick={handleConfirmDelete}>
              Confirmar
            </S.ConfirmButton>
          )}
          <S.CancelButton onClick={handleCancelDelete}>Cancelar</S.CancelButton>
        </S.ModalButtonsContainer>
      </S.ModalContent>
    </S.ModalContainer>
  );
};

export default ModalDelete;
