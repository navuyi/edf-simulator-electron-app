import "./style.scss"
import {Display} from "../../modules/Display";
import {T_TASK} from "../../modules/EDF";
import {EDF} from "../../modules/EDF";


const TIME_STEP = 500
const DISPLAY_SIZE = 10

const tasks : Array<T_TASK> = [
    {
        execution_time: 5,
        deadline: 7,
        name: "T1"
    },
    {
        execution_time: 2,
        deadline: 5,
        name: "T2"
    },
    {
        execution_time: 2,
        deadline: 3,
        name: "T3"
    },
    {
        execution_time: 2,
        deadline: 3,
        name: "T4"
    },
    {
        execution_time: 4,
        deadline: 5,
        name: "T5"
    }
]





const edf = new EDF(tasks)
const display = new Display(DISPLAY_SIZE)




let time = 0
setInterval(() => {
    time += 1

    edf.sort_by_earliest_deadline()
    edf.apply_time_progress()
    edf.remove_finished_tasks()


    display.update(time, edf.get_history(DISPLAY_SIZE))


}, TIME_STEP)





