import { TaskStatus } from "../enums/TaskStatus.enum";

export default interface TaskEntity {
    id: number;
    nameOrDescription: string;
    dateOfRealization: Date;
    status: TaskStatus;
    typeId: string;
}