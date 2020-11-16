
namespace`game.modules`(
    class SaveGame{
        constructor(){
            this.listenSonicData()
        }
        listenSonicData(){
            document.addEventListener("characterData", (e)=>{
                console.log(e)
            })
        }
    }
)