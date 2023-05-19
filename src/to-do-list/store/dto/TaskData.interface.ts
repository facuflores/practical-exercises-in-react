import { Moment } from "moment";
import { TaskStatus } from "../enums/TaskStatus.enum";

export default interface TaskData {
    id?: number;
    nameOrDescription: string;
    dateOfRealization: Moment | null;
    status: TaskStatus;
    specificType: string;
}