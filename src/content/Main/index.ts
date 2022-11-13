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
    const T1 = get_random_int(15)+5;    const p1 = Math.floor(0.3*T1)
    const T2 = get_random_int(15)+5;    const p2 = Math.floor(0.3*T2)
    const T3 = get_random_int(15)+5;    const p3 = Math.floor(0.3*T3)

    deadline_01.value = T1.toString(); execution_time_01.value = p1.toString()
    deadline_02.value = T2.toString(); execution_time_02.value = p2.toString()
    deadline_03.value = T3.toString(); execution_time_03.value = p3.toString()
}
document.getElementById("start").onclick = () => {start()}



let time = -1
let interval : ReturnType<typeof setInterval> = undefined
let running = true


document.getElementById("pause-resume").onclick = (e : MouseEvent) => {
    if(running === true){
        running = false
        const button = e.currentTarget as HTMLElement
        button.innerText= "Resume"
    }
    else if(running === false){
        running = true
        const button = e.currentTarget as HTMLElement
        button.innerText= "Pause"
    }
}


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
    const coef = Number(execution_time_01.value)/Number(deadline_01.value) + Number(execution_time_02.value)/Number(deadline_02.value) + Number(execution_time_03.value)/Number(deadline_03.value)
    if(coef > 1){
        window.alert(`Processor usage coefficient must be less than or equal 1. Current value ${coef}`)
        return
    }

    tasks.push({
        p: Number(execution_time_01.value),
        T: Number(deadline_01.value),
        current_T: Number(deadline_01.value),
        current_p: 0,
        name: "T1"
    })
    tasks.push({
        p: Number(execution_time_02.value),
        T: Number(deadline_02.value),
        current_T: Number(deadline_02.value),
        current_p: 0,
        name: "T2"
    })
    tasks.push({
        p: Number(execution_time_03.value),
        T: Number(deadline_03.value),
        current_T: Number(deadline_03.value),
        current_p: 0,
        name: "T3"
    })

    const edf = new EDF(tasks)
    const display = new Display(DISPLAY_SIZE)

    document.getElementById("start").setAttribute("disabled", "true")
    document.getElementById("generate-random").setAttribute("disabled", "true")
    document.getElementById("pause-resume").removeAttribute("disabled")

    

    interval = setInterval(() => {
        if(running === false){
           return
        }
        time += 1

        edf.handle_task_life_cycle(time)
        edf.sort_by_earliest_deadline(time)
        edf.apply_time_progress(time)
    
        display.update(time, edf.get_history())
    }, TIME_STEP)
}















