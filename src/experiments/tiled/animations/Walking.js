import! 'experiments.tiled.animations.Animation';


namespace `experiments.tiled.animations` (
    class Walking extends experiments.tiled.animations.Animation {
        constructor(name, sprite){
        	super(name, sprite);
			this.sprite = sprite;
			this.name   = name;
			this.sprite.y_velocity = 0;
			this.sprite.x_velocity = 0;
			this.sprite.x = 0;
			this.sprite.y = 0;
			// this.up    = false;
   //          this.down  = false;
   //          this.left  = false;
   //          this.right = false;
			// document.addEventListener('keydown', e=>this.onKeyInput(e));
   //          document.addEventListener('keyup',   e=>this.onKeyInput(e));
		}

		// onKeyUp(){

		// }

		// onKeyInput(e){
		// 	// console.log(e.key)
  //           const keydown = e.type === 'keydown';
  //           var key     = e.key.toLowerCase();

  //           key === 'w' && (this.up = keydown);
  //           key === 's' && (this.down = keydown);
  //           key === 'a' && (this.left = keydown);
  //           key === 'd' && (this.right = keydown);
  //           // console.log("key:",[this.up,this.down])
  //       }

		start(dir) {
			// debugger;
			if(this.isAnimating){return}
			this.sprite.classList.remove(this.name+"-"+this.dirstr);
			this.isAnimating=true;
			// this.update(dir);
		}

		stop() {
			this.sprite.classList.remove(this.name+"-right");
			this.sprite.classList.remove(this.name+"-left");
			this.sprite.classList.remove(this.name+"-up");
			this.sprite.classList.remove(this.name+"-down");

			this.isAnimating=false;
			// this.sprite.velocity = 1;
			this.sprite.y_velocity = 0;
			this.sprite.x_velocity = 0;
		}

		onUpdate(delta){
			//dir=1;
			// if(this.up){
			// 	console.log("up")
			// }
			// else if (this.down){
			// 	console.log("down")
			// }
			// this.up &&
			// this.down && console.log("down")
			if (Key.isDown(Key.RIGHT) && this.sprite.canWalk()){
				// console.log("right")
				// if (this.right && this.sprite.canWalk()) {
					this.stop();
					this.dir=1;
					this.dirstr = "right";
					this.start()
					this.isAnimating=true;
					this.sprite.x_velocity = 1;		
					// this.walk(delta)
				// } 
			}
			else if (Key.isDown(Key.LEFT) && this.sprite.canWalk()) {
				this.stop();
				this.dir=-1;
				this.dirstr = "left";
				this.start()
				this.isAnimating=true;
				this.sprite.x_velocity = 1;

				// this.walk(delta)
			}
			else if (Key.isDown(Key.DOWN) && this.sprite.canWalk()) {
				this.stop();
				this.dir=1;
				this.dirstr = "down";
				this.start()
				this.isAnimating=true;
				this.sprite.y_velocity = 1;
				// this.walk(delta)
			}
			else if (Key.isDown(Key.UP) && this.sprite.canWalk()) {
				this.stop();
				this.dir=-1;
				this.dirstr = "up";
				this.start()
				this.isAnimating=true;
				this.sprite.y_velocity = 1;
				// this.walk(delta)
			}
			else {
				this.stop()
			}
		}

		onDraw(delta=16.6){
			// console.log(this.sprite.velocity)
			if(!this.isAnimating){return}
			this.sprite.classList.add(this.name+"-"+this.dirstr);
			//increase velocity each frame while animation is running
			// this.sprite.velocity += .0000001 ;
			if(this.isAnimating){
				if(this.sprite.x <= 0) {
					this.sprite.x=0;
				}
				this.sprite.x += this.sprite.x_velocity*this.dir;
				this.sprite.y += this.sprite.y_velocity*this.dir;
				this.sprite.style.transform = "translate3d(" + this.sprite.x + "px," + this.sprite.y + "px,0px) scale(.5)";
			}
		}
    }
);
