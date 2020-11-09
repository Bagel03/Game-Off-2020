import { Vector } from "./Vector";

export class Rectangle{
    /**
     * 
     * @param {Vector} position The position of the top left coner of the rectangle 
     * @param {Vector} size The width and height of the rectangle
     */
    constructor(position, size){
        this.position = position;
        this.size = size;
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

    
}