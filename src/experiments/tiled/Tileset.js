
namespace `experiments.tiled` (
    class Tileset {
        constructor (map){
            this.map=map;
            this.tilesets=[];
        }

        async load(){
        	return new Promise(async (res,fail)=>{
	        	for(let tileset of this.map.tilesets){
	        		var response = await fetch('resources/maps/' + tileset.source.replace("tsx","json"));
	            	var _tileset = await response.json();
	            		_tileset.firstgid = tileset.firstgid;
	            	this.tilesets.push(_tileset);
	        	}
	        	console.log("All Tilesets For Map",this.tilesets)
	        	res(this.tilesets)
        	})
        }

        getTilesets(){
        	return this.tilesets;
        }

        getTilesetByIndex(index){
        	return this.tilesets[index];
        }

        // //returns a tileset
        // getTilesetForLayerByMaterialSource(layer){
        // 	if(layer){
        // 		if(layer.properties){
        // 			var material = layer.properties.filter(prop => prop.name == "MaterialSource");//ex: "TilesetPack_RockSand.tsx"
        // 			if(material && material.length>0){
        // 				var tileset = this.tilesets.filter(tileset => {
        // 					// debugger;
        // 					return tileset.name == material[0].value.replace(".tsx","")
        // 				});//ex: "tileset.name is like "TilesetPack_RockSand"
        // 				if(tileset && tileset.length>0) {
        // 					return tileset[0];
        // 				}
        // 				else {
        // 					console.error(`${this.namespace}#getTilesetForLayerByMaterialSource(<layer>) - no tileset matches the material used in this layer`,[layer,material])
        // 				}
        // 			}
        // 			else {
        // 				console.error(`${this.namespace}#getTilesetForLayerByMaterialSource(<layer>) - no 'MaterialSource' (a Tiled custom property) found for this layer in the map. Layer is:`, layer)
        // 			}
        // 		}
        // 		else {
        // 			console.error(`${this.namespace}#getTilesetForLayerByMaterialSource(<layer>) - no Tiled custom properties found for this layer in the map. Layer is:`, layer)
        // 		}
        // 	}
        // 	else {
        // 		console.error(`${this.namespace}#getTilesetForLayerByMaterialSource(<layer>) - <layer> arg is null or undefined. layer is:`, layer)
        // 	}
        // }

        getTileTypeById(tileset, tileType, layerIndex){
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
