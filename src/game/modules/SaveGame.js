
namespace`game.modules`(
    class SaveGame{
        constructor(){
            this.listenSonicData()
        }
        listenSonicData(){
            document.addEventListener("constructorData", (e)=>{
                console.log("Class SaveGame received event", e.detail)
            })
        }
    }
)