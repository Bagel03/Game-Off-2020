
namespace`game.modules`(
    class GetCharacterData{
        constructor(characterConstructor){
                this.testMethod()
                this.characterConstructor = characterConstructor;
                this.dispatchData = Event("characterData")
                this.dispatchSonicData();
                
        }
        testMethod(){
            console.log("Class GetCharacterData, Logged from:", this)
        }
        dispatchSonicData(){
            document.dispatchEvent(this.dispatchData, {characterConstructor: this.characterConstructor})
        }
    }

)