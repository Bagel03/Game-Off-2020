
namespace`game.modules`(
    class SaveGame{
        constructor(){
            this.eventArray = [];
            this.newStorage = localStorage
            this.listenSonicData()
            
        }
        listenSonicData(){
            document.addEventListener("constructorData", (e)=>{
                // console.log("Class SaveGame received event", e.detail)
                this.eventArray.push(e.detail)
                this.saveToLocalStorageAsJSON();
            })
        }
        saveToLocalStorageAsJSON(array =[]){
            array = this.eventArray;
            // jsondata = JSON.stringify(array[0])
            console.log(array)
            // this.newStorage["Save game"] = JSON.stringify(array)
        }
    }
)