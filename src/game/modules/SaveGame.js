
namespace`game.modules`(
    class SaveGame{
        constructor(){
            this.listenSonicData()
            this.eventArray = [];
        }
        listenSonicData(){
            document.addEventListener("constructorData", (e)=>{
                // console.log("Class SaveGame received event", e.detail)
                this.eventArray.push(e.detail)
                console.log(this.eventArray)
            })
        }
    }
)