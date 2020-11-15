import! 'game.modules.utils.Vector';
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

        set top(value){this.position.y = value}
        set left(value){this.position.x = value}
        set right(value){this.position.x = value - this.size.x}
        set bottom(value){this.position.y = value - this.size.y}

        set width(value){this.size.x = value}
        set height(value){this.size.y = value}

        copy = () => new Rectangle(this.left, this.top, this.width, this.height)


        /**
         * 
         * @param {Vector} vector 
         */
        setCenter = vector => this.position.setFromVector(vector.sub(this.size.copy().div(2)));

        static fromXYWH = (x, y, w, h) => new Rectangle(new game.modules.utils.Vector(x, y), new game.modules.utils.Vector(w, h));
    
    }
)