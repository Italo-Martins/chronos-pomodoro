import type { TaskModel } from "./TaskModels";

export type TaskStateModel = {
    tasks: TaskModel[];
    secundsRemaning: number;
    formattedSecundsRemaining: string;
    activeTask: TaskModel | null;
    currentCycle: number;
    config: {
        workTime: number;
        shortBreakTime: number;
        longBreakTime: number;
    };
}