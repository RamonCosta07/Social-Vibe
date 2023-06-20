// CSS
import * as S from "./ModalOpenPhotoStyles";
// Interface
import { IModalOpenPhotoProps } from "../../interfaces/IComponents/IModalOpenPhoto";

const ModalOpenPhoto = ({ onClose, children }: IModalOpenPhotoProps) => {
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent>{children}</S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ModalOpenPhoto;
