import TaskData from "../../store/dto/TaskData.interface";

export enum ModalTypeToDeleteTask {
    BY_NONE = "by-none",
    BY_ID = "by-id",
    BY_FINISHED = "by-finished",
    BY_ALL = "by-all",
};

export interface PropsModalToDeleteTask {
    id?: number;
    message?: string;
    type?: ModalTypeToDeleteTask;
    isOpenModal: boolean;
    onConfirmModal: () => void;
    onCloseModal: () => void;
};

export interface PropsModalToAddOrUpdateTask {
    id?: number;
    entity: TaskData;
    isOpenModal: boolean;
    onConfirmModal: (data: TaskData) => void;
    onCloseModal: () => void;
};
