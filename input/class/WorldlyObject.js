import Node from './Node.js';

export default class WorldlyObject extends Node{
	constructor(){
		super();

		this.height = null;
		this.width = null;
	}

	getHeight(){
		return( this.getHeightData() );
	}

	getHeightData(){
		return( this.height );
	}

	getWidth(){
		return( this.getWidthData() );
	}

	getWidthData(){
		return( this.width );
	}

	getBuffer(){
		return( this.getBufferData() );
	}
}
