import Sprite from './Sprite.js';

/**
 Good job!
    0 0
     v 
 */
export default class MessageGoodJob1 extends Sprite{
	constructor(){
		super();
		this.flag_display = false;
	}

	getDrawingData(){
		if( !this.flag_display ){
			return( [] );
		}

		var drawing_data = [
			['G','o','o','d',' ','j','o','b','!'],
			[' ',' ','0',' ','0',' ',' ',' ',' '],
			[' ',' ',' ','v',' ',' ',' ',' ',' ']
		];

		return( drawing_data );
	}
}
                
