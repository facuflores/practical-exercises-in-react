export type ConfirmDeleteModalProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onClose?: () => void;
};

export const ConfirmDeleteModalPropsDefault: ConfirmDeleteModalProps = {
  isOpen: false,
  message: "",
  onConfirm: () => {},
  onClose: () => {}
};