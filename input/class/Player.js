import Sprite from './Sprite.js';

/**
 * Player object
 *   ___
 *  / oo\
 *  \ - /
 *   /|\ 
 *   / \
 */
export default class Player extends Sprite{
	constructor(){
		super();

		this.flag_injured = false;
		this.flag_happy = false;
		this.flag_equip_large_stick_1 = false;
	}

	getDrawingData(){
		let drawing_data;

		let eye = 'o',
		mouth = '-';

		if( this.flag_injured ){
			eye = 'x'; 
			mouth = '~';
		}

		if( !this.flag_injured && this.flag_happy ){
			mouth = 'v';
		}

		drawing_data = [
			[' ','_','_','_',' '],
			['/',' ',eye,eye,'\\'],
			['\\',' ',mouth,' ','/'],
			[' ','/','|','\\',' '],
			[' ','/',' ','\\',' '] 
		];

		if( this.flag_equip_large_stick_1 ){
			drawing_data = [
				[' ','_','_','_',' ',' ',' '],
				['/',' ',eye,eye,'\\',' ',' '],
				['\\',' ',mouth,' ','/',' ','y'],
				[' ','/','|','\\',' ','/',' '],
				[' ','/',' ','\\',' ',' ',' '] 
			];
		}

		return( drawing_data );
	};
}
