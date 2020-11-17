
namespace`game.modules`(
    class SaveGame{
        sonic = {
            x: "",
            y: "",
        }    
        world = {
        
            cameraX:"",
            cameraY:"",
        }

        constructor(){
            this.eventArray = [];

            // need a few loops and comparison
            this.listenData("sonic", this.sonic)
            this.listenData("world", this.world)
        }
        listenData(eventname, filter){
            document.addEventListener(eventname, (e)=>{
                console.log(typeof e.detail)
            })
        }
    }
)