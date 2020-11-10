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
        moveBy(amount, framecount, interpolation = 'linear'){                    console.log('called')

            let animationFunct;
            switch(interpolation){
                case 'logarithmic':
                    animationFunct = frame => {
                        //If it is the last frame, do the same as last frame to get you to the final point
                        if(frame === framecount) this.setCenter(Vector.add(this.center, amount));
                        else this.setCenter(Vector.add(this.center, amount.div(2)));
                    }
                break;
                case 'delay':
                    animationFunct = frame => {
                        //If it is the last frame, jump to the final point
                        if(frame === framecount) this.viewport.position.add(amount);
                    }
                break;
                case 'linear':
                default:

                    const segment = amount.div(framecount)
                    animationFunct = frame => {
                        this.viewport.position.add(segment);
                    }
            }
            return new Promise((resolve, reject) => {
                this.animations.push(new CameraAnimation(framecount, animationFunct, () => {
                    this.animations.splice(this.animations.findIndex(() => this), 1);
                    resolve();
                }));
            })
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
            let animationFunct;
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
                    animationFunct = frame => {
                        this.zoom.add(segment);
                    };
            }
            return new Promise((resolve, reject) => {
                this.animations.push(new CameraAnimation(framecount, frame => animationFunct(frame), resolve()));
            })
        }

        
        update(){
            this.animations.forEach(animation => animation.run());
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
    },

)


class CameraAnimation{
    /**
     * @callback animationFunct
     * @param {number} frame The current frame of the animation
    */
   /**
    * @callback finishFunct
    */

    /** 
     * @param {number} frameCount The total number of frames the animation will run on.
     * @param {animationFunct} animationFunct Called for each frame of animation
     * @param {finishFunct} finishFunct Called once the animation is finihsed 
     */
    constructor(frameCount, animationFunct, finishFunct){
        this.currentFrame = 0;
        this.frameCount = frameCount;
        this.animationFunct = animationFunct;
        this.finishFunct = finishFunct
    }

    run = () => {
        this.currentFrame++;
        this.animationFunct();
        if(this.currentFrame === this.frameCount) this.finishFunct(); 
    }
}