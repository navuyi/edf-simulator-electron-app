import {parse} from "@typescript-eslint/parser";

export type T_TASK =  {
    execution_time: number,
    deadline: number,
    name: string
}

type T_HISTORY_ELEMENT = {
    time: number,
    task_name: string
}

export class EDF{
    private tasks:Array<T_TASK>
    private history:Array<string>

    constructor(initial_tasks:Array<T_TASK>) {
        this.tasks = initial_tasks
        this.history = []

        this.init()
    }

    private init = () : void => {
        this.init_controls()
    }

    private init_controls = () : void => {
        document.getElementById("add-task").onclick = (e) => {
            try{
                const deadline = parseInt((document.getElementById("deadline-input") as HTMLInputElement).value)
                const execution_time = parseInt((document.getElementById("execution-time-input") as HTMLInputElement).value)

                if(deadline < execution_time){
                    console.log("Deadline must be larger value than execution time")
                    return
                }
                if(!deadline || !execution_time){
                    return
                }
                this.tasks.push({
                    execution_time: execution_time,
                    deadline: deadline,
                    name: ""
                })
            }
            catch (err){
                console.log(err)
                return
            }



        }
    }


    public sort_by_earliest_deadline = ():void => {
        this.tasks = this.tasks.sort((a,b) => a.deadline - b.deadline)
    }

    public apply_time_progress = ():void => {
        if(this.tasks.length === 0){
            console.log("No tasks to be run")
            this.history.push("")
            return
        }
        const priority_task = this.tasks[0]
        if(priority_task.execution_time > 0){
            this.tasks[0].execution_time -= 1
            console.log(`Executing task ${this.tasks[0].name}`)
            this.history.push(this.tasks[0].name)
        }

        this.tasks.forEach(task => {
            if(task.execution_time > 0){
                task.deadline -= 1
            }

        })
    }

    public remove_finished_tasks = () => {
        let i = this.tasks.length
        while (i--) {
            if (this.tasks[i].execution_time === 0) {
                this.tasks.splice(i, 1);
            }
        }
    }

    public get_history = (max_elements:number) : Array<string> => {
        if(this.history.length < max_elements){
            return this.history
        }
        else{
            return this.history.slice(-max_elements)
        }
    }
}