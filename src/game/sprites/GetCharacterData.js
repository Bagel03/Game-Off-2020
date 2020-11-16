

namespace `game.sprites`(
    class GetCharacterData{
        constructor(characterConstructor){
                this.dispatchSonicData(characterConstructor);
                
        }
        dispatchSonicData(characterConstructor){
            this.dispatchData = new CustomEvent("characterData", {detail: characterConstructor});
            document.dispatchEvent(this.dispatchData)
        }
    }

)