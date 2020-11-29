import {boxBox} from '/src/experiments/tiled/colliders/boxBox.js';

namespace `experiments.tiled` (
    class Collider {
        constructor(hero,objects){
            this.hero=hero;
            this.objects = objects;
        }
        
        onFixedUpdate(){
            var hero=this.hero;
            var objects=this.objects;
            for(var i=0; i<=objects.length-1;i++){
                var object =objects[i];
                if(object==hero){continue}
                else {
                    var bounds = object.bounds?object.bounds[0] : {x:0,y:0,width:0,height:0}
                    if(boxBox(hero.x+hero.bounds[0].x,hero.y+hero.bounds[0].y,hero.bounds[0].width,hero.bounds[0].height,Math.round(object.x+bounds.x),Math.round(object.y+bounds.y),bounds.width,bounds.height)){
                        hero.onCollide(object);
                    }
                }
            }
        }
    }
)



