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
        return tile
    }


    private generate_time_tile = (time:number) => {
        const tile = document.createElement("timetile")
        tile.innerText = time.toString()

        document.getElementsByTagName("timeline")[0].appendChild(tile)
        this.time_tiles.push(tile)
        return tile
    }

    public update = (current_time:number, history:Array<string>):void => {
        /*
            this.task_tiles.forEach((tile, index) => {
                if(history[index] != null){
                    tile.innerText = history[index]
                    this.set_tile_color(tile)
                }
            })

            if(total_history_length >= this.display_size+1){
                this.time_tiles.forEach(tile => {
                    tile.innerText = (parseInt(tile.innerText)+1).toString()
                })
            }
        */
        if(history.length <= this.display_size){
            const index:number = history.length - 1
            this.task_tiles[index].innerText = history[index]
            this.set_tile_color(this.task_tiles[index])
        }   
        else{
            const new_task_tile = this.generate_task_tile()
            new_task_tile.innerText = history[history.length-1]

            const new_time_tile = this.generate_time_tile(history.length)

            const elem = document.getElementsByTagName("display")[0]
            elem.scrollLeft = elem.scrollWidth;
            this.set_tile_color(new_task_tile)
        }
       
    }

    private set_tile_color = (tile : HTMLElement) : void => {
        if(tile.innerText === "T1"){
            tile.style.backgroundColor = "#d00187" 
        }
        else if(tile.innerText === "T2"){
            tile.style.backgroundColor = "#8f065f" 
        }
        else if(tile.innerText === "T3"){
            tile.style.backgroundColor = "#870559" 
        }
        else if(tile.innerText === ""){
            tile.style.backgroundColor = "whitesmoke"
        }
    }
}