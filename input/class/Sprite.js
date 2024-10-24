import WorldlyObject from './WorldlyObject.js';

/**
 * Sprite
 */
export default class Sprite extends WorldlyObject{
	constructor(){
		super();
	}

	/**
	 * Get the sprite's bounding box
	 */
	getBoundingBox(){
		return( this.getBoundingBoxData() );
	}

	/**
	 * Get the data for the bounding box
	 * @return array 0: top left, 1: top right, 2: bottom right, 3: bottom left
	 */
	getBoundingBoxData(){
		const box_data = [];

		const height = this.getHeight(),
		width = this.getWidth();

		const x = this.getX(),
		y = this.getY();

		box_data.push( [ x, y ] );
		box_data.push( [ ( x + width ), y ] );
		box_data.push( [ ( x + width ), ( y + height ) ] );
		box_data.push( [ x, ( y + height ) ] );

		return( box_data );
	}

	getBufferData(){
		let index,
		length;

		const buffer_data = [];

		const drawing_data = this.getDrawing();

		index = 0;
		length = drawing_data.length;

		for( ; index < length; index++ ){
			let _index,
			_length;

			let _drawing_data = drawing_data[ index ];

			_index = 0;
			_length = _drawing_data.length;

			for( ; _index < _length; _index++ ){
				let _buffer_data = [
					this.getX() + _index,
					this.getY() + index,
					_drawing_data[ _index ]
				];

				buffer_data.push( _buffer_data );
			}
		}

		return( buffer_data );
	}


	/**
	 * Get the center of the sprite
	 * @return array 0: float x, 1: float y
	 */
	getCenterXY(){
		const bounding_box = this.getBoundingBox();

		const center_data = [];

		const x = ( ( bounding_box[ 1 ][ 0 ] - bounding_box[ 0 ][ 0 ] ) / 2 );
		const y = ( ( bounding_box[ 1 ][ 1 ] - bounding_box[ 0 ][ 1 ] ) / 2 );

		center_data.push( x, y );
		return( center_data );
	}

	getDrawing(){
		return( this.getDrawingData() );
	}

	getHeightData(){
		const drawing_data = this.getDrawingData();
		return( drawing_data.length );
	}

	/**
	 * @var array sprites
	 * @var float tolerance The amount from center (0 - 1)
	 * @todo add ability to check array
	 */
	getFlagIntersectingBoundingBoxes( sprites, tolerance ){
		tolerance = ( tolerance || 0 );

		const center = this.getCenterXY();

		const bounding_box = this.getBoundingBox();

		let flag_intersecting = false;

		let flag_intersecting_x = false,
		flag_intersecting_y = false;

		let index = 0,
		length = sprites.length;

		for( ; index < length; index++ ){
			let _flag_intersecting = false;

			let _sprite = sprites[ index ];

			let _bounding_box = _sprite.getBoundingBox();

			let a0 = {
				x : bounding_box[ 0 ][ 0 ],
				y : bounding_box[ 0 ][ 1 ]
			};

			let a1 = {
				x : bounding_box[ 1 ][ 0 ],
				y : bounding_box[ 1 ][ 1 ]
			};

			let a2 = {
				x : bounding_box[ 2 ][ 0 ],
				y : bounding_box[ 2 ][ 1 ]
			};

			let a3 = {
				x : bounding_box[ 3 ][ 0 ],
				y : bounding_box[ 3 ][ 1 ]
			};

			let b0 = {
				x : _bounding_box[ 0 ][ 0 ],
				y : _bounding_box[ 0 ][ 1 ]
			};

			let b1 = {
				x : _bounding_box[ 1 ][ 0 ],
				y : _bounding_box[ 1 ][ 1 ]
			};

			let b2 = {
				x : _bounding_box[ 2 ][ 0 ],
				y : _bounding_box[ 2 ][ 1 ]
			};

			let b3 = {
				x : _bounding_box[ 3 ][ 0 ],
				y : _bounding_box[ 3 ][ 1 ]
			};

			if( false
			 || ( ( a1.x >= b0.x ) && ( a0.x <= b1.x ) )
			 || ( ( b1.x >= a0.x ) && ( b0.x <= a1.x ) )
			){
				flag_intersecting_x = true;
			}

			if( false 
			 || ( ( a2.y >= b1.y ) && ( a1.y <= b2.y ) )
			 || ( ( b2.y >= a1.y ) && ( b1.y <= a2.y ) )
			){
				flag_intersecting_y = true;
			}

			if( flag_intersecting_x && flag_intersecting_y ){
				flag_intersecting = true;
			}
		}

		return( flag_intersecting );
	}

	getWidthData(){
		const drawing_data = this.getDrawingData();

		let width = 0;
		let index = 0,

		length = drawing_data.length;

		for( ; index < length; index++ ){
			let _index = 0,
			_length = drawing_data[ index ].length;

			let _drawing_data = drawing_data[ index ];

			if( width < _drawing_data.length ){
				width = _drawing_data.length;
			}
		}

		return( width );
	}
}
