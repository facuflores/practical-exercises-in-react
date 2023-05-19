import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Button, FormControl, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getAllTaskType, TaskTypeEntity } from '../../store/data/TaskType.interface';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PropsModalToAddOrUpdateTask } from './PropsModal.interface';
import { TodoInputSchema } from '../validations/TodoInput.schema';
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TaskData from "../../store/dto/TaskData.interface";
import TextField from "@mui/material/TextField";

const TodoModalComponent = ({modalToAddOrUpdateTask}: {modalToAddOrUpdateTask: PropsModalToAddOrUpdateTask}) => {
    
    const [open, setOpen] = useState<boolean>(false);
    const [initialEntity, setInitialEntity] = useState<TaskData>(modalToAddOrUpdateTask.entity);

    const handleConfirm = (data: TaskData) => {
        setOpen(false);
        modalToAddOrUpdateTask.onConfirmModal(data);
    };

    const handleClose = () => {
        setOpen(false);
        modalToAddOrUpdateTask.onCloseModal();
    };

    useEffect(() => {
        setInitialEntity({
            ...modalToAddOrUpdateTask.entity
        });
        setOpen(modalToAddOrUpdateTask.isOpenModal);
    }, [modalToAddOrUpdateTask.isOpenModal]);

    const formik = useFormik<TaskData>({
        initialValues: {
            ... initialEntity,
        },
        enableReinitialize: open,
        validationSchema: TodoInputSchema,
        onSubmit: (values, {resetForm}) => {
            handleConfirm({
                id: initialEntity.id,
                nameOrDescription: values.nameOrDescription,
                dateOfRealization: values.dateOfRealization,
                specificType: values.specificType,
                status: values.status
            });
            resetForm();
        }
    });

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Registro / Actualización de Tareas</DialogTitle>
                    <DialogContent>

                        {/* Forms */}
                        <FormControl fullWidth margin="normal">
                            <TextField 
                                id="nameOrDescription"
                                type="text"
                                name="nameOrDescription"
                                label="Nombre o Descripción de Tarea"
                                value={formik.values.nameOrDescription}
                                onChange={formik.handleChange}
                                error={formik.touched.nameOrDescription && Boolean(formik.errors.nameOrDescription)}
                                helperText={formik.touched.nameOrDescription && formik.errors.nameOrDescription}
                            />
                        </FormControl>
                    
                        <FormControl fullWidth margin="normal">
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    label="Fecha del Desarrollo de Tarea"
                                    format="DD/MM/YYYY"
                                    value={formik.values.dateOfRealization}
                                    onChange={(date) => formik.setFieldValue("dateOfRealization", date, false)}
                                    slotProps={{
                                        textField: {
                                            id: "dateOfRealization",
                                            name: "dateOfRealization",
                                            error: formik.touched.dateOfRealization && Boolean(formik.errors.dateOfRealization),
                                            helperText: formik.touched.dateOfRealization && formik.errors.dateOfRealization
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="specificType"
                                name="specificType"
                                label="Especificación de Tipo de Tarea"
                                select
                                value={formik.values.specificType}
                                onChange={formik.handleChange}
                                error={formik.touched.specificType && Boolean(formik.errors.specificType)}
                                helperText={formik.touched.specificType && formik.errors.specificType}
                            >
                                <MenuItem key="none" value="none">
                                    -- Seleccione tipo de tarea --
                                </MenuItem>

                                {getAllTaskType().map((option: TaskTypeEntity) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}

                            </TextField>
                        </FormControl>
                        {/* End Forms */}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button variant="contained" type="submit">Guardar Cambios</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default TodoModalComponent;