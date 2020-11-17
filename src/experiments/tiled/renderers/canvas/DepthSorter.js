namespace `experiments.tiled.renderers.canvas` (
    class DepthSorter{
        constructor(){
            this.context = document.createElement('canvas').getContext('2d');
            this.context.canvas.width = this.context.canvas.height = 500; //TODO fix this
        }
        /**
         * Should be called before each render cycle, this sorts the images and prepares them
         * @param {object []} images The images that need to be added to the scene 
         */
        preRender(...images){
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            images.sort((a, b) => {
                if(a.z !== undefined && b.z !== undefined) return a.z - b.z;
                if(a.z === undefined && b.z !== undefined) return 1;
                if(a.z !== undefined && b.z === undefined) return -1;
                return (a.dy + a.dh) - (b.dy + b.dh);
            })
            images.forEach((image) => {
                try{
                    this.context.drawImage(
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
                }catch(error){
                    console.log(error, image);
                    console.trace();
                }
            })
        
        }
    }
)