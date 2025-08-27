import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCucles } from '../../utils/getNextCucles';
import { getNextCuclesType } from '../../utils/getNextCuclesType';
import styles from './styles.module.css';

export function Cycles() {

  const {state} =  useTaskContext();

  const cycleStep = Array.from({length: state.currentCycle});

  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo'
  }

  return (
    <div className={styles.cycles}>
        <span>Ciclos:</span>

        <div className={styles.cycleDots}>

          {cycleStep.map((_, index) => {
            const nextCycle = getNextCucles(index);
            const nextCycleType = getNextCuclesType(nextCycle);

            return(<span 
              key = {`${nextCycleType}-${nextCycle}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`} 
              aria-label = {`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              title = {`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              ></span>)
          })}
        </div>
    </div>
  );
}