export interface TaskTypeEntity {
    id: string;
    name: string;
};

export const getAllTaskType = (): TaskTypeEntity[] => {
    return [
        {id: "home", name: "HOME"},
        {id: "work", name: "WORK"},
        {id: "sport", name: "SPORT"}
    ];
};

export const getOneTaskType = (id: string): TaskTypeEntity | null => {
    const taskTypeResult = getAllTaskType().filter((t) => t.id === id);
    return taskTypeResult.length === 1? taskTypeResult[0]: null;
};