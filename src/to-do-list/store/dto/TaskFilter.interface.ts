import { TaskStatus } from "../enums/TaskStatus.enum";

export default interface TaskFilter {
    status?: TaskStatus;
    typeId?: string;
};