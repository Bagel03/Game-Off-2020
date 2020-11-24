import! 'experiments.tiled.animations.Animation';


namespace `experiments.tiled.animations` (
    class Walking extends experiments.tiled.animations.Animation {
        constructor(name, sprite){
        	super(name, sprite);
			this.sprite = sprite;
			this.name   = name;
			// this.sprite.y_velocity = 0;
			// this.sprite.x_velocity = 0;
			// this.sprite.x = 0;
			// this.sprite.y = 0;
			// this.dir=0;
		}

		

		stop() {
			this.sprite.classList.remove(this.name+"-right");
			this.sprite.classList.remove(this.name+"-left");
			this.sprite.classList.remove(this.name+"-up");
			this.sprite.classList.remove(this.name+"-down");

			this.isAnimating=false;
			// this.sprite.velocity = 1;
			// this.sprite.y_velocity = 0;
			// this.sprite.x_velocity = 0;
		}
		clear(){
			this.sprite.classList.remove(this.name+"-right");
			this.sprite.classList.remove(this.name+"-left");
			this.sprite.classList.remove(this.name+"-up");
			this.sprite.classList.remove(this.name+"-down");
		}

		onUpdate(delta){
			// if (Key.isDown(Key.RIGHT)){
					// this.dir=1;
					// this.dirstr = "right";
			// 		this.isAnimating=true;
			// 		this.sprite.x_velocity = 1;		
			// }
			// else if (Key.isDown(Key.LEFT)) {
			// 	this.dir=-1;
			// 	this.dirstr = "left";
			// 	this.isAnimating=true;
			// 	this.sprite.x_velocity = 1;
			// }
			// else if (Key.isDown(Key.DOWN)) {
			// 	this.dir=1;
			// 	this.dirstr = "down";
			// 	this.isAnimating=true;
			// 	this.sprite.y_velocity = 1;
			// }
			// else if (Key.isDown(Key.UP)) {
			// 	this.dir=-1;
			// 	this.dirstr = "up";
			// 	this.isAnimating=true;
			// 	this.sprite.y_velocity = 1;
			// }
			// else {
			// 	this.stop()
			// }
		}

		



		
		//------------------------------MACHINE CALLED----------------------------

        //Called when machine awakes this component. Usualy we hide/show onAwake.
        //and do anything else like play music, sfx, animation etc
        onAwake(){
            // this.style.display="block";
            console.log(this.namespace + " Awake");
            // this.music.play();
            this.isAnimating=true;

        }

        //Machine puts it to sleep.Usually hide itself, pause music, animate out.
        onSleep(){
            // this.style.display="none";
            console.log(this.namespace + " Sleeping");
            // this.music.pause();
            this.isAnimating=false;
            this.stop()
        }

        //Machine calls it once if never started, hence tthe isStarted flag. Usually,
        //you append this component to DOM, which fires onConnected() above.
        onStart(dir) {
			if(this.isAnimating){return}
			this.sprite.classList.remove(this.name+"-"+this.sprite.dirstr);
			this.isAnimating=true;
			this.isStarted=true;
			console.log(this.namespace + " Started");
		}


        //Machine calls if isFinished is ever true. Destroy self and cleanup. 
        onExit(){
            console.log(this.namespace + " Exit")
            this.stop()
        }

        //onUpdate, runs 1x per frame. Good place to handle user input
       	onUpdate(timestamp, delta){
            // Key.isUp(Key.ESC) && this.dispatchEvent("startmenu")
        }


        //onFixedUpdate, runs many times per frame. Good place for physics/collision/ai
        onFixedUpdate(time) {}

        //onDraw, runs 1x per frame. Good place to paint
        onDraw(interpolation){
			if(this.isAnimating && !this.sprite.iscolliding){
				this.clear();
				this.sprite.classList.add(this.name+"-"+this.sprite.dirstr);
				// if(this.sprite.dirstr=="left"||this.sprite.dirstr=="right"){
				// 	this.sprite.x += this.sprite.x_velocity*this.sprite.direction;
				// }
				// else if(this.sprite.dirstr=="up"||this.sprite.dirstr=="down"){
				// 	this.sprite.y += this.sprite.y_velocity*this.sprite.direction;
				// }

				this.sprite.style.transform = "translate3d(" + this.sprite.x + "px," + this.sprite.y + "px, 0px)";
			}
		}
    }
);
