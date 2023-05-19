import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { PropsModalToDeleteTask } from "./PropsModal.interface";

const TodoDeleteModalComponent = ({modalToDeleteTask}: {modalToDeleteTask: PropsModalToDeleteTask}) => {

    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        setOpen(false);
        modalToDeleteTask.onConfirmModal()
    };

    const handleClose = () => {
        setOpen(false);
        modalToDeleteTask.onCloseModal();
    };

    useEffect(() => {
        if (modalToDeleteTask.isOpenModal) setOpen(true);
    }, [modalToDeleteTask.isOpenModal]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirmación de Tarea</DialogTitle>
            <DialogContent>
                {modalToDeleteTask.message}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleConfirm} >Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TodoDeleteModalComponent;