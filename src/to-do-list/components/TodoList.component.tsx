import { Alert, Button, Checkbox, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { getOneTaskType } from "../store/data/TaskType.interface";
import { ModalTypeToDeleteTask } from "./modals/PropsModal.interface";
import { TaskStatus } from "../store/enums/TaskStatus.enum";
import Chip from "@mui/material/Chip";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from "styled-components";
import TaskEntity from "../store/data/TaskEntity.interface";

const TextoTachado = styled.span`
    text-decoration: line-through;
`;

const TodoListComponent = ({
    currentTaskList, 
    onOpenModalToDeleteTask, 
    onOpenModalToAddOrUpdateTask,
    onUpdateTaskStatusById,
    onShowAllTask,
    onShowAllTaskByStatus,
}: any) => {

    const handleEditTaskById = (id: number) => {
        onOpenModalToAddOrUpdateTask({
            id,
        });
    };

    const handleDeleteTaskById = (id: number) => {
        onOpenModalToDeleteTask({
            id,
            type: ModalTypeToDeleteTask.BY_ID,
            message: `Desea eliminar la tarea con id: ${id}?`
        });
    };

    const handleDeleteAllTaskByStatus = (status: TaskStatus) => {
        onOpenModalToDeleteTask({
            type: ModalTypeToDeleteTask.BY_FINISHED,
            message: `Desea eliminar todas las tareas con estado: ${status.toUpperCase()}?`,
        });
    };

    const handleDeleteAllTask = () => {
        onOpenModalToDeleteTask({
            type: ModalTypeToDeleteTask.BY_ALL,
            message: `Desea eliminar todas las tareas?`
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => onShowAllTask()}
                        >
                            Todos
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => onShowAllTaskByStatus(TaskStatus.FINISHED)}
                        >
                            Realizados
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => onShowAllTaskByStatus(TaskStatus.PENDING)}
                        >
                            Pendientes
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={12}>
                {
                    currentTaskList.length <= 0 &&
                    <Alert severity="warning">
                        Por el momento, sin registros ...
                    </Alert>
                }
                {
                    currentTaskList.length > 0 &&
                    
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {currentTaskList.map((entity: TaskEntity) => (
                                    <TableRow key={entity.id}>
                                        <TableCell width="100" align="center">
                                            {entity.status === TaskStatus.PENDING
                                                ? <span>{entity.nameOrDescription}</span>
                                                : <TextoTachado>{entity.nameOrDescription}</TextoTachado>
                                            }
                                        </TableCell>
                                        <TableCell width="100" align="center">
                                            {getOneTaskType(entity.typeId)?.name}
                                        </TableCell>
                                        <TableCell width="100" align="center">
                                            <Chip 
                                                label={entity.status.toUpperCase()} 
                                                color={entity.status === TaskStatus.FINISHED? "error": "primary"} />
                                        </TableCell>
                                        <TableCell width="100" align="center">
                                            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                                <Checkbox 
                                                    checked={entity.status !== TaskStatus.PENDING}
                                                    onChange={(e, checked: boolean) => onUpdateTaskStatusById(entity.id, checked)} />
                                                <IconButton 
                                                    onClick={() => handleEditTaskById(entity.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton 
                                                    onClick={() => handleDeleteTaskById(entity.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Grid>

            <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteAllTaskByStatus(TaskStatus.FINISHED)}
                        >
                            Borrar Realizados
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteAllTask()}
                        >
                            Borrar Todos
                        </Button> 
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

};

export default TodoListComponent;