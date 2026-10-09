/**
 * An element with a coordinate
 */
export default class Node{
	constructor(){
		this.x = null;
		this.y = null;
	}

	getX(){
		return( this.x );
	}

	getY(){
		return( this.y );
	}

	putXY( x, y ){
		this.x = x;
		this.y = y;
	}
}
