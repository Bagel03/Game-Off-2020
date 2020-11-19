import! 'system.math.MathUUID';
namespace `experiments.tiled.renderers.canvas`(
    class Scene{
        constructor(width, height){
            this.images = {};
            this.context = document.createElement('canvas').getContext('2d');
            this.context.canvas.width = width;
            this.context.canvas.height = height;
            console.log(height)
            this.context.imageSmoothingEnabled = false;
            this.context.canvas.style.imageRendering = 'pixelated'
            this.imageArr = [];
        }

        addImage(image,  renderCords = {}, uvCords = {}, z){
            const ID = Math.uuid();
            console.log(image)
            this.images[ID] = {
                image: image,
                //The texture cords to grab the image from
                uvCords: {
                    x: uvCords.x || 0,
                    y: uvCords.y || 0,
                    w: uvCords.w || image.width,
                    h: uvCords.h || image.height
                },
                renderCords: {
                    x: renderCords.x || 0,
                    y: renderCords.y || 0,
                    w: renderCords.w || image.width,
                    h: renderCords.h || image.height
                },
                // z: imageProps.z === undefined ? imageProps.renderY + imageProps.renderH : imageProps.z
            }
            this.images[ID].z = z === undefined ?  this.images[ID].renderCords.y + this.images[ID].renderCords.h : z;
            this.sortImages();
            return ID;
        }

        editImage(ID, image,  renderCords = {}, uvCords = {}, z){
            this.images[ID] = {
                image: image,
                //The texture cords to grab the image from
                uvCords: {
                    x: uvCords.x || 0,
                    y: uvCords.y || 0,
                    w: uvCords.w || image.width,
                    h: uvCords.h || image.height
                },
                renderCords: {
                    x: renderCords.x || 0,
                    y: renderCords.y || 0,
                    w: renderCords.w || image.width,
                    h: renderCords.h || image.height
                },
                // z: imageProps.z === undefined ? imageProps.renderY + imageProps.renderH : imageProps.z
            }
            this.images[ID].z = z === undefined ?  this.images[ID].renderCords.y + this.images[ID].renderCords.h : z;
            this.sortImages();
            return ID;
        }

        removeImage(ID){
            this.images[ID] = null;
        }

        //We sort at image loading time so we dont have to sort every frame
        sortImages(){
            this.imageArr = Object.values(this.images);
            this.imageArr.sort((a, b) => a.z - b.z);
        }

        render(){
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            this.imageArr.forEach(imageObject => {
                this.context.drawImage(
                    imageObject.image,
                    imageObject.uvCords.x,
                    imageObject.uvCords.y,
                    imageObject.uvCords.w,
                    imageObject.uvCords.h,
                    imageObject.renderCords.x,
                    imageObject.renderCords.y,
                    imageObject.renderCords.w,
                    imageObject.renderCords.h
                )
            })
        }
    }
)