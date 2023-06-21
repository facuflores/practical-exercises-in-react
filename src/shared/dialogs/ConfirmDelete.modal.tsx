import { Button } from "@mui/material";
import { ConfirmDeleteModalProps } from "../types/ApplicationModal.type";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmDeleteModal = ({data}: {data: ConfirmDeleteModalProps}) => {
  const {isOpen, message, onConfirm, onClose} = data;
  const [open, setOpen] = useState<boolean>(isOpen);
  
  useEffect(() => initializeWhenIsOpenChange(), [data.isOpen]);

  const initializeWhenIsOpenChange = () => {
    setOpen(data.isOpen);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose !== undefined) onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmación de Eliminación</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleConfirm}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;