import Sprite from './Sprite.js';

export default class ItemLargeStick1 extends Sprite{
	constructor(app){
		super();
		this.flag_used = false;
		this.app = app;
	}

	getDrawingData(){
		if( !this.flag_used ){
			return( [] );
		}

		let drawing_data = [ [ '\\', ' ', '/' ] ];

		const scenery_1 = this.app.getData( 'world' )[ 1 ];
		const scenery_2 = this.app.getData( 'world' )[ 2 ];

		let index = 0,
		length = ( (scenery_2.getY() - scenery_1.getY() ) - 2  );

		for( ; index < length; index++ ){
			drawing_data.push( [ ' ', '|', ' ' ] );
		}

		return( drawing_data );
	};
}
