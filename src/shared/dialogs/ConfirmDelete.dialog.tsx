import { AppDispatch } from "../../to-move/test-react-redux/principal.store";
import { Button } from "@mui/material";
import { OnCloseAppDeleteDialog } from "../redux/AppDialog.reducer";
import { OnDeleteCharacterById } from "../../rick-and-morty-list/redux/RkAndMtCharacter.reducer";
import { RootState } from "../redux/App.store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogIdEnum } from "./DialogId.enum";

const ConfirmDeleteDialog = () => {

  const appDispatch = useDispatch<AppDispatch>();
  const appDialogProps = useSelector(({appDialog}: RootState) => appDialog.toDelete);
  const [open, setOpen] = useState(appDialogProps.isOpen);

  useEffect(() => {
    setOpen(appDialogProps.isOpen);
  }, [appDialogProps.isOpen]);

  const handleConfirm = () => {
    if (appDialogProps.type === DialogIdEnum.RK_AND_MT_DELETE_ITEM) {
      appDispatch(OnDeleteCharacterById(appDialogProps.id));
    }
    handleClose();
  };

  const handleClose = () => {
    appDispatch(OnCloseAppDeleteDialog());
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmación de Eliminación</DialogTitle>
      <DialogContent>
        {appDialogProps.message}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleConfirm} >Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;