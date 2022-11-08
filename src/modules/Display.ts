export class Display{

    private display_size:number
    private time_tiles:Array<HTMLElement>
    private task_tiles:Array<HTMLElement>

    constructor(display_size:number) {
        this.time_tiles = []
        this.task_tiles = []

        this.display_size = display_size


        this.init()
    }



    public init = ():void => {
       this.init_tiles()
    }

    private init_tiles = () => {
        for(let i=0; i<this.display_size; i++){
            this.generate_task_tile()
            this.generate_time_tile(i+1)
        }
    }

    private generate_task_tile = () => {
        const tile = document.createElement("tasktile")

        document.getElementsByTagName("taskline")[0].appendChild(tile)
        this.task_tiles.push(tile)
    }


    private generate_time_tile = (time:number) => {
        const tile = document.createElement("timetile")
        tile.innerText = time.toString()

        document.getElementsByTagName("timeline")[0].appendChild(tile)
        this.time_tiles.push(tile)
    }

    public update = (current_time:number, history:Array<string>):void => {
        console.log(history)
        this.task_tiles.forEach((tile, index) => {
            if(history[index] != null){
                tile.innerText = history[index]
            }
        })

        if(history.length >= this.display_size){
            this.time_tiles.forEach(tile => {
                tile.innerText = (parseInt(tile.innerText)+1).toString()
            })
        }
    }
}