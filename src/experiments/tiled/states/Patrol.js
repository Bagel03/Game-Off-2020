await import('/src/game/modules/utils/Vector.js');
import! 'experiments.tiled.states.Behavior';
let {Vector} = game.modules.utils;

namespace `experiments.tiled.states` (
    class Patrol extends experiments.tiled.states.Behavior {
        constructor(sprite){
            super(name, sprite);
            var Vector = game.modules.utils.Vector;
            this.sprite = sprite;
            let map = application.map;
            this.wayPoints = [
                new Vector(158,253),
                new Vector(158,300),
                new Vector(158,253),
                new Vector(100,253)
                // new Vector(map.getX(10),map.getY(18))
            ];
            this.currentWP = 0;
        }


        


        //------------------------------MACHINE CALLED----------------------------

        //Called when machine awakes this component. Usualy we hide/show onAwake.
        //and do anything else like play music, sfx, animation etc
        onAwake(){
            console.log(this.namespace + " Awake");
            this.isPatrolling=true;
            this.currentWP = 0;

        }

        //Machine puts it to sleep.Usually hide itself, pause music, animate out.
        onSleep(){
            console.log(this.namespace + " Sleeping");
            this.isPatrolling=false;
            // this.stop()
        }

        //Machine calls it once if never started, hence the isStarted flag. Usually,
        //you append this component to DOM, which fires onConnected() above.
        onStart(dir) {
            if(this.isPatrolling){return}
            // this.sprite.classList.remove(this.name+"-"+this.sprite.dirstr);
            this.isPatrolling=true;
            this.isStarted=true;
            console.log(this.namespace + " Started");
        }


        //Machine calls if isFinished is ever true. Destroy self and cleanup. 
        onExit(){
            console.log(this.namespace + " Exit")
            // this.stop()
        }

        //onUpdate, runs 1x per frame. Good place to handle user input
        onUpdate(timestamp, delta){
            if(this.wayPoints.length<=0){
                return
            }
            var waypoint = this.wayPoints[this.currentWP];
            var distance = waypoint.dist(this.sprite.position)
            if(distance <= 1){
                this.currentWP++;
                if(this.currentWP>=this.wayPoints.length){
                    this.currentWP=0;
                }
            }
            // var angleDeg = Math.atan2(waypoint.x - this.sprite.position.x, waypoint.y - this.sprite.position.y) * 180 / Math.PI;
            var angleDeg = this.getAngle(waypoint,this.sprite.position);
            // console.log("angleDeg",angleDeg)
            var pos = Vector.moveTowards(this.sprite.position,waypoint, 1.7);
            console.log("getCardinalDirection",this.getCardinal(angleDeg))
            this.sprite.position.x += pos.x;
            this.sprite.position.y += pos.y;
        }

        normalize(angle) {
            if (angle > 0) {
                return angle;
            }
            else {
                return 2 * Math.PI + angle;
            }
        }

        getAngle(p1,p2) {
            let angle;
            // let a1 = Math.atan2(c1.y - circle.cy, c1.x - circle.cx);
            // let a2 = Math.atan2(c2.y - circle.cy, c2.x - circle.cx);
            
            let a1 = Math.atan2(p1.y - p2.y, p1.x - p2.x);
            let a2 = Math.atan2(p2.y - p2.y, p2.x - p2.x);

            angle = 2 * Math.PI - this.normalize(a2 - a1);
            // if (degrees.value) {
            //     return (angle * 180 / Math.PI).toFixed(1) + '°';
            // }
            // else {
            //     return angle.toFixed(3) + ' rad';
            // }
            return (angle * 180 / Math.PI)
        }

        // getAngle(source,compare){
        //     var a2 = Math.atan2(source.y, source.x);
        //     var a1 = Math.atan2(compare.y, compare.x);
        //     var sign = a1 > a2 ? 1 : -1;
        //     var angle = a1 - a2;
        //     var K = -sign * Math.PI * 2;
        //     var angle = (Math.abs(K + angle) < Math.abs(angle))? K + angle : angle;
        //     return angle
        // }

        getCardinal(angle) {
          /** 
           * Customize by changing the number of directions you have
           * We have 8
           */
          const degreePerDirection = 360 / 4;

          /** 
           * Offset the angle by half of the degrees per direction
           * Example: in 4 direction system North (320-45) becomes (0-90)
           */
          const offsetAngle = angle + degreePerDirection / 2;

          return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
            : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
              : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
                : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
                  : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
                    : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                      : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                        : "NW";
        }


        //onFixedUpdate, runs many times per frame. Good place for physics/collision/ai
        onFixedUpdate(time) {}

        //onDraw, runs 1x per frame. Good place to paint
        onDraw(interpolation){
            // if(this.isPatrolling && !this.sprite.iscolliding){
            //     this.clear();
            //     this.sprite.classList.add(this.name+"-"+this.sprite.dirstr);
                var x = Math.round(this.sprite.position.x);
                var y = Math.round(this.sprite.position.y);

                // this.sprite.style.transform = "translate3d(" + x + "px," + y + "px, 0px)";
            // }
            this.sprite.style.transform = `translate3d(${x}px,${y}px,0px)`;
        }
    }
);
