import Sprite from './Sprite.js';

export default class Button1 extends Sprite{
	constructor( constructor_data ){
		super();

		this.flag_pressed = false;
	}

	getDrawingData(){
		if( this.flag_pressed ){
			return( [] );
		}

		const drawing_data = [
			['^',' ','^'],
			[' ','o',' ']
		];

		return( drawing_data );
	};
}
