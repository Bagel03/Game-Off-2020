namespace `experiments.tiled.renderers.canvas`(
    class Parser{
        constructor(map){
            this.map = map;
        }

        addToScene(scene){
            for(let i = 0; i < this.map.layers.length; i++){
                var layer = this.map.layers[i];
                    layer.visible && this.addLayerToScene(scene, i,layer);
            }
        }

        addLayerToScene(scene, layerIndex, layerObject){
            if(layerObject.type =="tilelayer"){
                const context = document.createElement('canvas').getContext('2d');
                context.canvas.width = this.map.width * this.map.tilewidth;
                context.canvas.height = this.map.height * this.map.tileheight;
                for (let row = 0; row < this.map.height; row++) {
                    for (let col = 0; col < this.map.width; col++) {
                        let tileTypeID = this.map.getTile(layerIndex,col, row);
                        if( tileTypeID === 0) continue;
                        let tileset = layerIndex === 0 ?
                            this.map.getTilesetByIndex(layerIndex):
                            this.map.getTilesetForLayerByMaterialSource(layerObject);
                        let tilepos = this.map.getTilePositionFor(tileset, tileTypeID, layerIndex);//returns {col,row,x,y}
                        let x = col * this.map.tilewidth;
                        let y = row * this.map.tileheight;
                        this.renderTile(context, tileset.image, tilepos, {x, y});
                    }
                }
                //Force tilelayers to the bottom
                scene.addImage(context.canvas, {}, {}, -(this.map.layers.length - layerIndex));
            }
            // else if(layerObject.type=="imagelayer"){
            //     let img = layerObject.image;
            //         img.style.position="absolute";
            //         img.style.left = layerObject.offsetx+"px";
            //         img.style.top  = layerObject.offsety+"px";
            //     layerdiv.appendChild(img);
            // }
            else if(layerObject.type=="objectgroup"){
                console.log('object')
                let objects = layerObject.objects;
                if(objects){
                    for(let i=0; i < objects.length; i++){
                        let object = objects[i];
                        let tileset = this.map.getTilesetByGid(object.gid);
                        scene.addImage(tileset.image, object)
                        // let img = tileset.image;
                        //     img.style.position="absolute";
                        //     img.style.left = `${object.x}px`;
                        //     img.style.top  = `${object.y}px`;
                        // layerdiv.appendChild(img);
                    }
                }
            }
        }

        renderTile(context, image, imageCords, renderCords){
            context.drawImage(image, imageCords.x, imageCords.y, this.map.tilewidth, this.map.tileheight, renderCords.x, renderCords.y, this.map.tilewidth, this.map.tileheight)
        }
    }
)