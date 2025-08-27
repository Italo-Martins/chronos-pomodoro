import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModels";
import { initialTaskState } from "./initialTaskState";

type TaskContextType = {
    state: TaskStateModel;
    setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
}

const initialContextValue = {
    state: initialTaskState,
    setState: () => {}
}

export const TaskContext = createContext<TaskContextType>(initialContextValue);
