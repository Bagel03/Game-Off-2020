namespace `game.modules`(
    class Camera{
        constructor(tag){
            this.tag = tag;
            this.x = 0;
            this.y = 0;
            this.rotation = 0;
            this.scaleX = 0;
            this.scaleY = 0;
            this.animations = []
        }

        moveBy(x, y, frameCount, interpolation = 'linear'){
            switch(interpolation){
                case 'linear':
                    return new Promise(res => {
                        this.animations.push(new CameraAnimation(frameCount, () =>{
                            this.x += x/frameCount;
                            this.y += y/frameCount;
                            console.log('running')
                        }, res))
                    })
                break;
            }
        }

        moveTo(x, y, frameCount){
            return this.moveBy(this.x - x, this.y - y, frameCount)
        }

        scale(){

        }

        
        onDraw(){
            this.animations.forEach((animation, index) => {
                animation.run();
                animation.currentFrame === animation.frameCount && this.animations.splice(index, 1)
            });
            this.setTagFromData();
        }

        setTagFromData(){
            this.tag.style.transform = `translate(${this.x}px, ${this.y}px) `//rotate(${this.ang}deg) scale(${this.scaleX}, ${this.scaleY})`;
        }
    }
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
        //alert("CameraAnimation")
        this.currentFrame = 0;
        this.frameCount = frameCount;
        this.animationFunct = animationFunct;
        this.finishFunct = finishFunct
    }

    run = () => {
        this.currentFrame++;
        this.animationFunct();
        this.currentFrame === this.frameCount && this.finishFunct(); 
    }
}