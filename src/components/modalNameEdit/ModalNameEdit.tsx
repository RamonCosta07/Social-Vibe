// Styles
import * as S from "./ModalNameEditStyles";
// Interface
import { IModalNameEditProps } from "../../interfaces/IComponents/IModalEditName";
// Hooks
import { useRef, useEffect } from "react";
// Icons
import { AiTwotoneAlert } from "react-icons/ai";
// Components
import Error from "../error/Error";

const ModalNameEdit = ({
  newName,
  handleInputChange,
  loading,
  isNameValid,
  handleNameUpdate,
  setNewName,
  setShowModal,
  errorNewName,
}: IModalNameEditProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <S.ModalBackground>
      <S.ModalContent>
        <h2>Editar Nome</h2>
        <S.AlertMessage>
          {errorNewName ? (
            <Error>{errorNewName}</Error>
          ) : (
            <p>
              <AiTwotoneAlert color="#1877F2" />
              Nome preenchido está válido
            </p>
          )}
        </S.AlertMessage>

        <S.InputContainer>
          <S.ModalInput
            type="text"
            value={newName}
            onChange={handleInputChange}
            ref={inputRef}
          />
        </S.InputContainer>

        <S.ModalButtons>
          {!loading ? (
            <>
              <S.ConfirmButton
                disabled={!isNameValid()}
                onClick={handleNameUpdate}
              >
                Confirmar
              </S.ConfirmButton>

              <S.CancelButton
                onClick={() => {
                  setNewName("");
                  setShowModal(false);
                }}
              >
                Cancelar
              </S.CancelButton>
            </>
          ) : (
            <p>Aguarde...</p>
          )}
        </S.ModalButtons>
      </S.ModalContent>
    </S.ModalBackground>
  );
};

export default ModalNameEdit;
