import Sprite from './Sprite.js';

export default class Scenery1 extends Sprite{
	getDrawingData(){
		const drawing_data = [
			'/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/'.split('')
		];

		return( drawing_data );
	};
}
