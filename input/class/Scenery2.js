import Sprite from './Sprite.js';

export default class Scenery2 extends Sprite{
	getDrawingData(){
		const drawing_data = [
			'\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\'.split('')
		];

		return( drawing_data );
	};
}
