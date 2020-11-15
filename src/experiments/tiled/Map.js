
namespace `experiments.tiled` (
    class Map {
        constructor (path){
            this.path=path;
            this.map=null;
            this.tilesets=[];
            this.collisions={};
        }

        async load(){
            var response = await fetch(this.path);
            this.map = await response.json();
            

            return new Promise(async (res,fail)=>{
                this.processImageLayers()
                for(let tileset of this.map.tilesets){
                    var tilesetPath = this.path.substr(0,this.path.lastIndexOf("/"));
                    var response = await fetch(tilesetPath +"/" + tileset.source.replace("tsx","json"));
                    var _tileset = await response.json();
                        _tileset.firstgid = tileset.firstgid;
                        var img = new Image;
                            img.src = tilesetPath +"/" + _tileset.image;
                            _tileset.src = _tileset.image;
                            _tileset.image = img;//rewrite prop
                    this.tilesets.push(_tileset);
                    this.processBounds(_tileset)
                }
                console.log("All Tilesets For Map",this.tilesets)
                res(this)
            })
        }

        processImageLayers(){
            for(var i=0; i<=this.layers.length-1; i++){
                var layer = this.layers[i];
                console.log("layer",layer)
                if(layer.type=="imagelayer"){
                    // console.log("image layer:",layer)
                    var imagepath = this.path.substr(0,this.path.lastIndexOf("/"));
                    var img = new Image;
                        img.src = imagepath +"/" + layer.image;
                        layer.image=img;
                }
            }
        }

        //for each tileset (holding collision bounds as <tilesseet.objectgroup.objects[]>), 
        //add collision objects globally to map.collissions{}, keyed by maps tile type id.
        //ex usage from world/collider:
        //  this.map.collisions[177] where 177 is the tile type id
        //  returns array of collision objects for this 1 tile
        processBounds(tileset){
            for(var i=0; i<=tileset.tiles.length-1; i++){
                var tile = tileset.tiles[i];
                this.collisions[tile.id+1] = tile.objectgroup.objects;//tile.id+1 because 1 less in tileset. Tiled Editor design
            }
        }

        get layers(){
            return this.map.layers;
        }

        get height(){
            return this.map.height;
        }

        get width(){
            return this.map.width;
        }

        get tilewidth(){
            return this.map.tilewidth;
        }

        get tileheight(){
            return this.map.tileheight;
        }

        getTilesets(){
            return this.tilesets;
        }

        //only used by layer 0 tto get tileset/atlas due to a tiled bug, mussst be accessed differently.
        getTilesetByIndex(index){
            return this.tilesets[index];
        }

        getTile (layer, col, row) {
            return this.map.layers[layer].data[row * this.map.height + col];
        }

        getCol (x) {
            return Math.floor(x / this.width);
        }

        getRow (y) {
            return Math.floor(y / this.height);
        }

        getX (col) {
            return col * this.width;
        }
        
        getY (row) {
            return row * this.height;
        }

        //returns a tileset/atlas for the layer based on MaterialSource property
        getTilesetForLayerByMaterialSource(layer){
            if(layer){
                if(layer.properties){
                    var material = layer.properties.filter(prop => prop.name == "MaterialSource");//ex: "TilesetPack_RockSand.tsx"
                    if(material && material.length>0){
                        var tileset = this.tilesets.filter(tileset => {
                            // debugger;
                            return tileset.name == material[0].value.replace(".tsx","")
                        });//ex: "tileset.name is like "TilesetPack_RockSand"
                        if(tileset && tileset.length>0) {
                            return tileset[0];
                        }
                        else {
                            console.error(`${this.namespace}#getTilesetForLayerByMaterialSource(<layer>) - no tileset matches the material used in this layer`,[layer,material])
                        }
                    }
                    else {
                        console.error(`${this.namespace}#getTilesetForLayerByMaterialSource(<layer>) - no 'MaterialSource' (a Tiled custom property) found for this layer in the map. Layer is:`, layer)
                    }
                }
                else {
                    console.error(`${this.namespace}#getTilesetForLayerByMaterialSource(<layer>) - no Tiled custom properties found for this layer in the map. Layer is:`, layer)
                }
            }
            else {
                console.error(`${this.namespace}#getTilesetForLayerByMaterialSource(<layer>) - <layer> arg is null or undefined. layer is:`, layer)
            }
        }

        getTilePositionFor(tileset, tileType, layerIndex){
            if(tileset.firstgid != 1){
                // debugger;
            }
            var firstgid = Number(tileset.firstgid);
            var tileType = tileType-firstgid;
            // layerIndex <=0 ? (tileType -= 1):null;//Tiled Bug 

            var index = tileType;
            var col = index % tileset.columns; 
            var row = Math.floor(index / tileset.columns);

            var x = col*tileset.tilewidth;
            var y = row*tileset.tileheight;

            return {col,row,x,y}
        }

        getTileWithAnyCollision(tileset, tileType, layerIndex){
            if(tileset.firstgid != 1){
                // debugger;
            }
            var firstgid = Number(tileset.firstgid);
            var tileType = tileType-firstgid;
            // layerIndex <=0 ? (tileType -= 1):null;//Tiled Bug 

            var index = tileType;
            var col = index % tileset.columns; 
            var row = Math.floor(index / tileset.columns);

            var x = col*tileset.tilewidth;
            var y = row*tileset.tileheight;

            return {col,row,x,y}
        }
    }
);
