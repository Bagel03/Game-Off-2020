
namespace`game.modules`(
    class SaveGame{
        constructor(){
            this.listeners = ["sonic","world"]
            this.listenData(this.listeners);
        }
       listenData(array=[]){
           array.forEach(listener =>{
               document.addEventListener(listener, even =>{
                   for( const element in even.detail){
                        console.log(element, even.detail[element])
                        localStorage.setItem(`${listener}, ${element}`, even.detail[element])
                   }
               })
           })
       }
    }
)