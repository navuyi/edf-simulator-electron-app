

export type T_TASK =  {
    p: number,
    T: number,
    current_T: number,
    current_p: number,
    name: string
}


export class EDF{
    private tasks:Array<T_TASK>
    private archive:Array<T_TASK>
    private history:Array<string>

    constructor(initial_tasks:Array<T_TASK>) {
        this.tasks = initial_tasks
        this.archive = []
        this.history = []

    }

   

    public sort_by_earliest_deadline = (current_time : number):void => {
        this.tasks = this.tasks.sort((a,b) => (a.current_T-current_time) - (b.current_T-current_time))
        //this.tasks = this.tasks.sort((a,b) => a.deadline - b.deadline)
    }

    public apply_time_progress = (current_time : number):void => {
        if(this.tasks.length > 0){
            const first_task = this.tasks[0]
            first_task.current_p += 1
            this.history.push(first_task.name)
            console.log(`Executing task ${first_task.name}`)
        }
        else{
            this.history.push("")
        }
    }


    public handle_task_life_cycle = (current_time:number) => {
        let index = this.tasks.length
        while(index--){
            const task = this.tasks[index]
            if(task.current_p === task.p){
                console.log(`Moving task ${task.name} to archive`)
                task.current_p = 0
                this.archive.push(task)
                this.tasks.splice(index, 1)
            }
        }

        // Add task back to this.tasks --> means its active again
        let x = this.archive.length
        while(x--){
            const task = this.archive[x]
            if(task.current_T === current_time){
                console.log(`Moving task ${task.name} back to living`)
                task.current_T += task.T
                task.current_p = 0
                this.tasks.push(task)

                this.archive.splice(x, 1)
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

    public get_tasks = () : Array<T_TASK>=> {
        return JSON.parse(JSON.stringify(this.tasks));
    }

    public are_there_task_left = () : boolean => {
        console.log(this.tasks.length)
        return this.tasks.length > 0
    }
}