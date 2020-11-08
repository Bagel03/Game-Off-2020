namespace `game.modules` (
    class Loader {
        constructor(){
            this.count=0;
            this.images= {};
        }
        

        add(title, src) {
            const image = new Image();
            image.src = src;
            this.images[title] = image;
            this.count++;
        },

        // init() {
        //     loader.add('sonic', Sonic.src);
        //     loader.add('coin', Coin.src);
        // }
    }
)