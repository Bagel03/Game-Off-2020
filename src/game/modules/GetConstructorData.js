

namespace `game.modules`(
    class GetConstructorData{
        constructor(constructorConstructor){
                this.dispatchSonicData(constructorConstructor);
                
        }
        dispatchSonicData(constructorConstructor){
            this.dispatchData = new CustomEvent("constructorData", {detail: constructorConstructor});
            document.dispatchEvent(this.dispatchData)
        }
    }

)