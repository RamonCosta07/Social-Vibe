export interface IModalDeleteProps {
  msg: string;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  secondsRemaining?: number;
}
