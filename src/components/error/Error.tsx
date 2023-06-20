// Styles
import * as S from "./ErrorStyles";
// Interface
import { ErrorProps } from "../../interfaces/IComponents/IError";

const Error = ({ children }: ErrorProps) => {
  return (
    <S.ErrorMessage>
      <p>{children}</p>
    </S.ErrorMessage>
  );
};

export default Error;
