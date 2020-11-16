
namespace`game.modules`(
    class GetCharacterData{
        constructor(characterConstructor){
                this.characterConstructor = characterConstructor;
                this.dispatchData = Event("characterData")
                this.listenQuitFromPauseMenu()
                this.testMethod()
        }
        testMethod(){
            console.log("Class GetCharacterData, Logged from:", this)
        }
        dispatchSonicData(){
            document.dispatchEvent(this.dispatchData, {characterConstructor: this.characterConstructor})
        }
        listenQuitFromPauseMenu(){
            document.addEventListener("savegame", e => this.dispatchSonicData)
        }
    }

)