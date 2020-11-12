namespace `game.modules.utils`(
    class Vector{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }

        setFromVector = (vector) => {
            this.x = vector.x;
            this.y = vector.y;
            return this;
        }
        
        set = (x, y) => {
            this.x = x;
            this.y = y;
            return this;
        } 

        copy = () => new Vector(this.x, this.y);

        
        add = vector => {
            this.x += vector.x;
            this.y += vector.y;
            return this;
        }

        sub = vector => {
            this.x -= vector.x;
            this.y -= vector.y;
            return this;
        }

        mult = multiplier => {
            this.x *= multiplier;
            this.y *= multiplier;
            return this;
        }

        multByVector = vector => {
            this.x *= vector.x;
            this.y *= vector.y;
            return this;
        }

        div = divisor => {
            this.x /= divisor;
            this.y /= divisor;
            return this;
        }

        divByVector = vector => {
            this.x /= vector.x;
            this.y /= vector.y;
        }

        sqMag = () => this.x * this.x + this.y * this.y;

        mag = () => Math.sqrt(this.sqMag());

        norm = () => this.div(this.mag());

        //#region static
        static add = (first, second) => new Vector(first.x + second.x, first.y + second.y);

        static sub = (first, second) => new Vector(first.x - second.x, first.y - second.y);

        static mult = (vector, multiplier) => new Vector(vector.x * multiplier, vector.y * multiplier);

        static multByVector = (first, second) => new Vector(first.x * second.x, first.y * second.y);
        
        static div = (vector, divisor) => new Vector(vector.x / divisor, vector.y / divisor);

        static divByVector = (first, second) => new Vector(first.x / second.x, first.y / second.y);

        static norm = vector => Vector.div(vector, vector.mag); 
        
    }
)