import "./style.scss"
import {Display} from "../../modules/Display";
import {T_TASK} from "../../modules/EDF";
import {EDF} from "../../modules/EDF";
import { get_random_int } from "../../utils/get-random-int";


const TIME_STEP = 500
const DISPLAY_SIZE = 20

const tasks : Array<T_TASK> = [
  
]


const deadline_01 = document.getElementById("deadline_01") as HTMLInputElement
const deadline_02 = document.getElementById("deadline_02") as HTMLInputElement
const deadline_03 = document.getElementById("deadline_03") as HTMLInputElement

const execution_time_01 = document.getElementById("execution_time_01") as HTMLInputElement
const execution_time_02 = document.getElementById("execution_time_02") as HTMLInputElement
const execution_time_03 = document.getElementById("execution_time_03") as HTMLInputElement

document.getElementById("generate-random").onclick = (e) => {
    const val_01 = get_random_int(10)+10
    const val_02 = get_random_int(10)+10
    const val_03 = get_random_int(10)+10

    deadline_01.value = val_01.toString(); execution_time_01.value = (val_01 - get_random_int(5) - 1).toString()
    deadline_02.value = val_02.toString(); execution_time_02.value = (val_02 - get_random_int(5) - 1).toString()
    deadline_03.value = val_03.toString(); execution_time_03.value = (val_03 - get_random_int(5) - 1).toString()
}


document.getElementById("start").onclick = () => {start()}


const start = () : void => {
    if(
        !deadline_01.value || !deadline_02 || !deadline_03 ||
        !execution_time_01.value || !execution_time_02.value || !execution_time_03.value
    ){
        window.alert("Provided values are wrong or missing. Try again.")
        return
    }
    
    if(
        Number(execution_time_01.value) > Number(deadline_01.value) ||
        Number(execution_time_02.value) > Number(deadline_02.value) || 
        Number(execution_time_03.value) > Number(deadline_03.value)
    ){
        window.alert("Execution time of a task cannot be longer than its deadline!")
        return
    }

    tasks.push({
        execution_time: Number(execution_time_01.value),
        deadline: Number(deadline_01.value),
        deadline_original: Number(deadline_01.value),
        execution_time_original: Number(execution_time_01.value),
        name: "T1"
    })
    tasks.push({
        execution_time: Number(execution_time_02.value),
        deadline: Number(deadline_02.value),
        deadline_original: Number(deadline_02.value),
        execution_time_original: Number(execution_time_02.value),
        name: "T2"
    })
    tasks.push({
        execution_time: Number(execution_time_03.value),
        deadline: Number(deadline_03.value),
        deadline_original: Number(deadline_03.value),
        execution_time_original: Number(execution_time_03.value),
        name: "T3"
    })


    const edf = new EDF(tasks)
    const display = new Display(DISPLAY_SIZE)


    document.getElementById("start").setAttribute("disabled", "true")
    document.getElementById("generate-random").setAttribute("disabled", "true")

    let time = 0
    let running = true
    const interval = setInterval(() => {
        time += 1

        edf.sort_by_earliest_deadline()
        edf.apply_time_progress()
        edf.remove_finished_tasks()
        edf.reset_finished_tasks(time)

        display.update(time, edf.get_history(DISPLAY_SIZE))

        edf.are_there_task_left() ? null : clearInterval(interval)

        

    }, TIME_STEP)
}















