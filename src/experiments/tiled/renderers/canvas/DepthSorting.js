import 'system.math.MathUUID';
namespace `experiments.tiled.renderers.canvas` (
    class DepthSorting{
        constructor(){
            this.buffer = document.createElement('canvas').getContext('2d');
            this.imgs = [];
        }
        /**
         * Should be called before each render cycle, this sorts the images and prepares them
         * @param {object []} images The images that need to be added to the scene 
         */
        preRender(...images){
            images.sort((a, b) => {
                if(a.z !== undefined && b.z !== undefined) return a.z - b.z;
                if(a.z === undefined && b.z !== undefined) return 1;
                if(a.z !== undefined && b.z === undefined) return -1;
                return (a.sx + a.sh) - (b.sx + b.sy);
            })
            images.forEach((image) => {
                this.buffer.drawImage(
                    image.image,
                    image.sx,
                    image.sy,
                    image.sw,
                    image.sh,
                    image.dx, 
                    image.dy, 
                    image.dw,
                    image.dh 
                )
            })
        }
    }
)