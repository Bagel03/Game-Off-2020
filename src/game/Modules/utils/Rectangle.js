import! 'game.modules.utils.vector';
namespace `game.modules.utils`(
        class Rectangle{

        constructor(x, y, w, h){
            this.position = new game.modules.utils.Vector(x, y);
            this.size = new game.modules.utils.Vector(w, h)
        }

        get top(){return this.position.y;}
        get left(){return this.position.x;}
        get right(){return this.position.x + this.size.x;}
        get bottom(){return this.position.y + this.size.y;}

        get width(){return this.size.x}
        get height(){return this.size.y}

        /**
         * 
         * @param {Vector} vector 
         */
        setCenter = vector => this.position.setFromVector(vector.sub(this.size.copy().div(2)));

        static fromXYWH = (x, y, w, h) => new Rectangle(new game.modules.utils.Vector(x, y), new game.modules.utils.Vector(w, h));
    }
)