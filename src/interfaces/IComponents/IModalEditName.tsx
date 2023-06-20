export interface IModalNameEditProps {
  newName: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  isNameValid: () => boolean;
  handleNameUpdate: () => Promise<void>;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  errorNewName: string;
}
