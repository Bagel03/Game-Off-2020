
namespace `experiments.tiled.renderers.canvas` (
    class Topdown {
        constructor(map){
            this.map = map;
        }

        getLayerImages(){ // return an array of all the image objects that the depth sorter will sort and the camera will render
            const arr = [];
            for(let i = 0; i < this.map.layers.length; i++){
                var layer = this.map.layers[i];
                arr.push(this.getLayerImage(i,layer))
            }
            console.log(arr)
            return arr;
            // this.drawGrid();
        }

        getLayerImage (layer, layerObject) {
            const {map} = this;
            if(layerObject.type==="imagelayer"){
                const img = {
                    image: layerObject.image, 
                    sx: 0, 
                    sy: 0, 
                    sw: layerObject.image.width,
                    sh: layerObject.image.height,
                    dx: layerObject.offsetx,
                    dy: layerObject.offsety,
                    dw: layerObject.image.width,
                    dh: layerObject.image.height
                }
                console.log(img)
                return img;
            }
            else if(layerObject.type=="tilelayer"){
                const context = document.createElement('canvas').getContext('2d');
                const size = this.getImageBoundingBox(layer);
                context.canvas.width = size.x + size.w + 1;
                context.canvas.height = size.y + size.h + 1;
                for(let row = 0; row < map.width; row++){
                    for(let col = 0; col < map.height; col++){
                        const tile = map.getTile(layer, col, row);
                        if(tile === 0) continue;
                        var tileset = layer === 0 ?
                        map.getTilesetByIndex(layer):
                        map.getTilesetForLayerByMaterialSource(map.layers[layer]);
                        var tilepos = map.getTilePositionFor(tileset, tile, layer);//returns {col,row,x,y}
                        context.drawImage(
                            tileset.image, 
                            tilepos.x, 
                            tilepos.y, 
                            map.tilewidth,
                            map.tileheight,
                            col * map.tilewidth,
                            row * map.tileheight,
                            map.tilewidth,
                            map.tileheight
                        )
                    }
                }
                return {
                    image: context.canvas,
                    sx: 0, 
                    sy: 0, 
                    sw: size.x + size.w,
                    sh: size.y + size.h,
                    dx: 0,
                    dy: 0,
                    dw: size.x + size.w,
                    dh: size.y + size.h,
                    z: layerObject.name === 'Ground' ? 0  : undefined
                }
            }
        }

        getImageBoundingBox(layer){
            const {map} = this;
            const boudingBox = { //default to absolutes
                minRow: map.width,
                minCol: map.height,
                maxRow: 0,
                maxCol: 0 
            }
            for(let row = 0; row < map.height; row++){
                for(let col = 0; col < map.width; col++){
                    if(map.getTile(layer, col, row) !== 0){
                        boudingBox.minRow = Math.min(boudingBox.minRow, row);
                        boudingBox.minCol = Math.min(boudingBox.minCol, col);                       
                        boudingBox.maxRow = Math.max(boudingBox.maxRow, row);
                        boudingBox.maxCol = Math.max(boudingBox.maxCol, col);
                    }
                }
            }
            let obj = {
                x: boudingBox.minCol * map.tilewidth,
                y: boudingBox.minRow * map.tileheight,
                w: (boudingBox.maxCol - boudingBox.minCol + 1) * map.tilewidth,
                h: (boudingBox.maxRow - boudingBox.minRow + 1) * map.tileheight
            }
            return obj;
        }

        drawGrid () {
            var map=this.map;
            var width = map.width * map.tilewidth;
            var height = map.height * map.tileheight;
            var x, y;
            for (var r = 0; r < map.height; r++) {
                x = - this.camera.x;
                y = r * map.tileheight - this.camera.y;
                this.context.beginPath();
                this.context.moveTo(x, y);
                this.context.lineTo(width, y);
                this.context.stroke();
            }
            for (var c = 0; c < map.width; c++) {
                x = c * map.tilewidth - this.camera.x;
                y = - this.camera.y;
                this.context.beginPath();
                this.context.moveTo(x, y);
                this.context.lineTo(x, height);
                this.context.stroke();
            }
        }
    }
)