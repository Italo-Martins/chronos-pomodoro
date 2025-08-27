import type { TaskStateModel } from "../../models/TaskStateModels";

export const initialTaskState: TaskStateModel = {
    tasks: [],
    secundsRemaning: 0,
    formattedSecundsRemaining: '00:00',
    activeTask: null,
    currentCycle: 0,
    config: {
        workTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
    }
}