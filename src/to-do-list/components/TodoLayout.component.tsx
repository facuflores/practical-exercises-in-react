import { Grid, Typography } from "@mui/material";
import { ModalTypeToDeleteTask, PropsModalToAddOrUpdateTask, PropsModalToDeleteTask } from "./modals/PropsModal.interface";
import { TaskStatus } from "../store/enums/TaskStatus.enum";
import { useEffect } from "react";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from "moment";
import TaskData from "../store/dto/TaskData.interface";
import TaskEntity from "../store/data/TaskEntity.interface";
import TaskFilter from "../store/dto/TaskFilter.interface";
import TodoDeleteModalComponent from "./modals/TodoDeleteModal.component";
import TodoInputComponent from "./TodoInput.component";
import TodoListComponent from "./TodoList.component";
import TodoModalComponent from "./modals/TodoModal.component";

const TodoLayoutComponent = () => {

    const [taskFilter, setTaskFilter] = useState<TaskFilter>({});
    const [taskList, setTaskList] = useState<TaskEntity[]>([]);
    const [taskListCopy, setTaskListCopy] = useState<TaskEntity[]>([]);

    const [modalToDeleteTask, setModalToDeleteTask] = useState<PropsModalToDeleteTask>({
        isOpenModal: false,
        type: ModalTypeToDeleteTask.BY_NONE,
        onConfirmModal: () => {},
        onCloseModal: () => {}
    });

    const [modalToAddOrUpdateTask, setModalToAddOrUpdateTask] = useState<PropsModalToAddOrUpdateTask>({
        entity: {
            nameOrDescription: "",
            dateOfRealization: null,
            specificType: "none",
            status: TaskStatus.PENDING
        },
        isOpenModal: false,
        onConfirmModal: (data: TaskData) => {},
        onCloseModal: () => {}
    });

    useEffect(() => onFilterTaskWithParams(), [taskFilter, taskList]);

    /**
     * 
     */
    const onAddTask = (entity: TaskData) => {
        const taskID = new Date().getTime();
        console.log('creating task with id: ' + taskID);

        const task: TaskEntity = {
            id: taskID,
            nameOrDescription: entity.nameOrDescription || "",
            dateOfRealization: entity.dateOfRealization?.toDate() || new Date(),
            typeId: entity.specificType,
            status: entity.status
        };

        setTaskList([...taskList, task]);
    };

    /**
     * 
     */
    const onUpdateTask = (entity: TaskData) => {
        console.log('updating task with id: ' + entity.id);
        const taskUpdated = onFindTaskById(entity.id || -1);
        taskUpdated.nameOrDescription = entity.nameOrDescription;
        taskUpdated.dateOfRealization = entity.dateOfRealization?.toDate() || new Date();
        taskUpdated.typeId = entity.specificType;
        taskUpdated.status = entity.status;

        const taskListAfterUpdate = taskList.map((t) => {
            return (t.id !== entity.id)? t: taskUpdated;
        });

        setTaskList([...taskListAfterUpdate]);
    };

    /**
     * 
     */
    const onFindTaskById = (taskID: number): TaskEntity => {
        return taskList.filter((t) => t.id === taskID)[0];
    };

    /**
     * 
     */
    const onDeleteTaskById = (taskID: number) => {
        console.log('delete task with id: ' + taskID);
        const taskListAfterDelete = taskList.filter((t) => t.id !== taskID);
        setTaskList(taskListAfterDelete);
    };

    /**
     * 
     */
    const onUpdateTaskStatusById = (taskID: number, isChecked: boolean) => {
        console.log(`update task status with id: ${taskID} and checked: ${isChecked}`);
        const status = isChecked? TaskStatus.FINISHED: TaskStatus.PENDING;

        const taskListAfterUpdate = taskList.map((t) => {
            return (t.id !== taskID)? t: {...t, status};
        });

        setTaskList(taskListAfterUpdate);
    };

    /**
     * 
     */
    const onDeleteAllTask = () => {
        console.log('delete all task');
        setTaskList([]);
    };

    /**
     * 
     */
    const onDeleteAllTaskByStatus = (status: TaskStatus) => {
        console.log(`delete all task with status: ${status}`);
        const taskListAfterFilter = taskList.filter((t) => t.status !== status);
        setTaskList(taskListAfterFilter);
    };

    /**
     * 
     */
    const onFilterTaskWithParams = () => {
        if (taskFilter.status) {
            const taskListAfterFilter = taskList.filter((t) => t.status === taskFilter.status);
            setTaskListCopy(taskListAfterFilter);
        }
        else if (taskFilter.typeId) {
            const taskListAfterFilter = taskList.filter((t) => t.typeId === taskFilter.typeId);
            setTaskListCopy(taskListAfterFilter);
        }
        else {
            setTaskListCopy(taskList);
        }
    };

    /**
     * 
     */
    const onShowAllTask = () => {
        setTaskFilter({status: undefined, typeId: undefined});
    };

    /**
     * 
     */
    const onShowAllTaskByStatus = (status: TaskStatus) => {
        setTaskFilter({status, typeId: undefined});
    };

    /**
     * Abre el modal para confirmar el borrado de una tarea
     */
    const onOpenModalToDeleteTask = (props: PropsModalToDeleteTask) => {
        setModalToDeleteTask({
            ... props,
            isOpenModal: true,
            onConfirmModal: () => {
                if (props.type === ModalTypeToDeleteTask.BY_ALL) onDeleteAllTask();
                if (props.type === ModalTypeToDeleteTask.BY_FINISHED) onDeleteAllTaskByStatus(TaskStatus.FINISHED);
                if (props.type === ModalTypeToDeleteTask.BY_ID) onDeleteTaskById(props.id || -1);
                setModalToDeleteTask({... modalToDeleteTask, isOpenModal: false});
            },
            onCloseModal: () => {
                setModalToDeleteTask({... modalToDeleteTask, isOpenModal: false});
            }
        });
    };

    /**
     * Abre el modal para crear o editar una tarea
     */
    const onOpenModalToAddOrUpdateTask = (props: PropsModalToAddOrUpdateTask) => {
        let entity: TaskData;

        if (!props.id) {
            console.log('create task');
            entity = initializateTaskEntity();
        } else {
            console.log('edit task with id: ' + props.id);
            const taskOne = onFindTaskById(props.id || -1);
            entity = initializateTaskEntity(taskOne);
        }

        setModalToAddOrUpdateTask({
            ... props,
            entity,
            isOpenModal: true,
            onConfirmModal: (data: TaskData) => {
                if (entity.id) onUpdateTask(data); else onAddTask(data);
                setModalToAddOrUpdateTask({... modalToAddOrUpdateTask, isOpenModal: false});
            },
            onCloseModal: () => {
                setModalToAddOrUpdateTask({... modalToAddOrUpdateTask, isOpenModal: false});
            }
        });
    };

    /**
     * 
     */
    const initializateTaskEntity = (data?: TaskEntity): TaskData => {
        if (data) {
            return {
                id: data.id,
                nameOrDescription: data.nameOrDescription,
                dateOfRealization: moment(data.dateOfRealization),
                specificType: data.typeId,
                status: data.status
            };
        }
        return {
            nameOrDescription: "",
            dateOfRealization: null,
            specificType: "none",
            status: TaskStatus.PENDING
        };
    };

    return (
        <Grid container className="content-center-x-y"  spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">
                                    TODO INPUT
                                </Typography>
                                <TodoInputComponent 
                                    onOpenModalToAddOrUpdateTask={onOpenModalToAddOrUpdateTask}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">
                                    TODO LIST
                                </Typography>
                                <TodoListComponent 
                                    currentTaskList={taskListCopy}
                                    onOpenModalToDeleteTask={onOpenModalToDeleteTask}
                                    onOpenModalToAddOrUpdateTask={onOpenModalToAddOrUpdateTask}
                                    onUpdateTaskStatusById={onUpdateTaskStatusById}
                                    onShowAllTask={onShowAllTask}
                                    onShowAllTaskByStatus={onShowAllTaskByStatus}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            <TodoModalComponent
                modalToAddOrUpdateTask={modalToAddOrUpdateTask}
            />

            <TodoDeleteModalComponent
                modalToDeleteTask={modalToDeleteTask}
            />

        </Grid>
    );

};

export default TodoLayoutComponent;