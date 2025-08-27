import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultInput } from "../DefaultInput";
import { DefaultButton } from "../DefaultButton";
import { useRef } from "react";

import styles from './styles.module.css';
import type { TaskModel } from "../../models/TaskModels";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCucles } from "../../utils/getNextCucles";
import { getNextCuclesType } from "../../utils/getNextCuclesType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {

    const {state, setState} = useTaskContext();

    const taskNameInput = useRef<HTMLInputElement>(null);

    const nextCycle = getNextCucles(state.currentCycle);
    const nextCycleType = getNextCuclesType(nextCycle)

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            alert('Por favor, insira um nome para a tarefa.');
            return;
        }

        const newTask: TaskModel= {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };

        const secondsRemaining = newTask.duration * 60;

        setState((prevState) => ({
            ...prevState,
            activeTask: newTask,
            currentCycle: nextCycle,
            secondsRemaining,
            formattedSecundsRemaining: formatSecondsToMinutes(secondsRemaining),
            tasks: [...prevState.tasks, newTask],
        }));
    }

    function handleInterruptTask(){
        setState((prevState) => ({
            ...prevState,
            activeTask: null,
            currentCycle: nextCycle,
            secondsRemaining: 0,
            formattedSecundsRemaining: '00:00',
            tasks: prevState.tasks.map(task => {
                if(prevState.activeTask && prevState.activeTask.id === task.id){
                    return {...task, interruptDate: Date.now()};
                }
                return task;
            })
        }));
    }

    return (
        <form onSubmit={handleCreateNewTask} className={styles.form} action="">
            <div className={styles.formRow}>
                <DefaultInput labeltext='tesk'
                id='meuInput'
                type='text'
                placeholder='Digite algo'
                ref={taskNameInput}
                disabled={!!state.activeTask}
                />
            </div>

            <div className={styles.formRow}>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            {state.currentCycle > 0 && (
                <div className={styles.formRow}>
                <Cycles></Cycles>
                </div>
            )}

            <div className={styles.formRow}>
                {!state.activeTask && (
                    <DefaultButton 
                        icon={<PlayCircleIcon/>}
                        aria-label='Iniciar nova tarefa'
                        title='Iniciar nova tarefa'
                        type='submit'
                        key='botoa_submit'
                    />
                )}

                {!!state.activeTask && (
                    <DefaultButton 
                        icon={<StopCircleIcon/>}
                        aria-label='Interromper tarefa atual'
                        title='Interromper tarefa atual'
                        type='button'
                        color="red"
                        onClick={handleInterruptTask}
                        key='botoa_button'
                    />
                )}
                
            </div>
        </form>
        
    )
}