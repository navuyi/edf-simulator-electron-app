

export type T_TASK =  {
    execution_time: number,
    deadline: number,
    execution_time_original: number,
    deadline_original: number,
    name: string
}


export class EDF{
    private tasks:Array<T_TASK>
    private history:Array<string>

    constructor(initial_tasks:Array<T_TASK>) {
        this.tasks = initial_tasks
        this.history = []

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
            priority_task.execution_time -= 1
            this.history.push(priority_task.name)
        }

        this.tasks.forEach(task => {
            if(task.execution_time > 0){
                task.deadline -= 1
            }
        })

        console.log(this.tasks.slice())
    }

    public remove_finished_tasks = () => {
        let i = this.tasks.length
        while (i--) {
            if (this.tasks[i].execution_time === 0) {
                this.tasks.splice(i, 1);
            }
        }
    }

    public reset_finished_tasks = (current_time : number) => {
        for(const task of this.tasks){
            if(task.execution_time === 0){
                task.deadline = task.deadline_original + current_time
                task.execution_time = task.execution_time_original
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

    public are_there_task_left = () : boolean => {
        console.log(this.tasks.length)
        return this.tasks.length > 0
    }
}