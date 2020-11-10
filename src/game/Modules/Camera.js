namespace `game.modules`(
    class Camera{
        /**
         * 
         * @param {Rectangle} viewport The virtual rectangle that the camera can capture from the input canvas
         * @param {Rectangle} target Size (as expressed as a rectangle) of the target "Screen" that the camera will render to
         */
        constructor(viewport, target){
            this.animations = [];
            this.viewport = viewport;
            this.target = target;
        }

        /**
         * 
         * @param {Vector} amount The vector which is added to the camera's position. 
         * @param {number} framecount The number of update loops that the camera must go through before the movement is compleate
         * @param {string} interpolation Type of interpolation to using durring the camera's movement
         * 
         */
        moveBy(amount, framecount, interpolation = 'linear'){
            switch(interpolation){
                case 'logarithmic':
                    this.animations.push(new CameraAnimation(framecount, frame => {
                        //If it is the last frame, do the same as last frame to get you to the final point
                        if(frame === framecount) this.setCenter(Vector.add(this.center, amount));
                        else this.setCenter(Vector.add(this.center, amount.div(2)));
                    }))
                break;
                case 'delay':
                    this.animations.push(new CameraAnimation(framecount, frame => {
                        //If it is the last frame, jump to the final point
                        if(frame === framecount) this.setCenter(Vector.add(this.center, amount));
                    }))
                break;
                case 'linear':
                default:
                    const segment = amount.div(framecount)
                    this.animations.push(new CameraAnimation(framecount, frame => {
                        this.setCenter(Vector.add(this.center, segment));
                    }))
            }
        }

        /**
         * 
         * @param {Vector} target The target position for the center of the camera's viewport
         * @param {number} framecount The number of update loops that the camera must go through before the movement is compleate
         * @param {string} interpolation Type of interpolation to using durring the camera's movement
         * 
         */
        moveTo(target, framecount, interpolation = 'linear'){
            const diff = Vector.sub(target, this.center);
            this.moveBy(diff, framecount, interpolation)
        }

        zoomBy(scaler, framecount, interpolation = 'linear'){
            switch(interpolation){
                case 'logarithmic':
                    this.animations.push(new CameraAnimation(framecount, frame => {
                    }))
                break;
                case 'exponential':

                break;
                case 'delay':
                    this.animations.push(new CameraAnimation(framecount, frame => {
                        if(frame === framecount) this.zoom.multByVector(scaler);
                    }));
                break;
                case 'linear':
                default:
                    const segment = scaler.div(framecount);
                    this.animations.push(new CameraAnimation(framecount, frame => {
                        this.zoom.add(segment);
                    }));
            }
        }


        
        update(){
            this.animations.reverse();
            for(let i = this.animations.length; i > -1; i--){
                if(this.animations[i].run()) this.animations.splice(i, 1);
            }
            this.animations.reverse();
        }

        /**
         * 
         * @param {CanvasRenderingContext2D} buffer The buffer context that the camera is capturing 
         * @param {CanvasRenderingContext2D} target The target context that the camera is rendering to. 
         */
        render(buffer, target){
            target.drawImage(buffer.canvas,
                this.viewport.left, this.viewport.top, this.viewport.width, this.viewport.height,
                this.target.left,   this.target.top,   this.target.width,   this.target.height)
        }
        
        setCenter(vector){
            this.center.setFromVector(vector);
            this.viewport.setCenter(vector);
        }

    },

    class CameraAnimation{
        /**
         * @callback animationFunct
         * @param {number} frame The current frame of the animation
        */
    
        /** 
         * @param {number} frameCount The total number of frames the animation will run on.
         * @param {animationFunct} animationFunct Called for each frame of animation
         */
        constructor(frameCount, animationFunct){
            this.currentFrame = 0;
            this.frameCount = frameCount;
            this.animationFunct = animationFunct;
        }

        run = () => {
            this.currentFrame++;
            this.animationFunct();
            return this.currentFrame === this.frameCount;
        }
    }
)