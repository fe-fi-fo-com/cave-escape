/**
 * A coordinate system (primarily for use within the fabric of dimensional existence)
 * @url https://math.stackexchange.com/a/3327865
 */
export default class CoordinateSystem{
	constructor( constructor_data ){
		this.cardinality = null;
		this.axes = {};
		this.origin = null;

		let axes_data = ( constructor_data?.axes_data || null );

		if( axes_data ){
			this.putAxesData( axes_data );
		}
	}

	getAxes = function(){
		return( this.getAxesData() );
	};

	getAxesData = function(){
		return( this.axes );
	};

	/**
	 * Get the cardinality of the coordinate system.
	 * Note: The cardinality should match the dimension of the fabric that employs it.
	 */
	getCardinality = function(){
		return( this.getCardinalityData() );
	};

	/**
	 * Get the cardinality data.
	 */
	getCardinalityData = function(){
		return( this.cardinality );
	};

	getOrigin = function(){
		return( this.getOriginData() );
	};

	getOriginData = function(){
		return( this.origin );
	};

	getScale = function(){
		return( this.getScaleData() );
	};

	getScaleData = function(){
		return( this.scale );
	};

	putAxes = function( axes_data ){
		this.putAxesData( axes_data );
	};

	putAxesData = function( axes_data ){
		let index,
		length;

		if( typeof axes_data[ 'length' ] == 'undefined' ){
			return;
		}

		index = 0;
		length = axes_data.length;

		for( ; index < length; index++ ){
			let _axis_data = axes_data[ index ];
			this.putAxis( _axis_data );
		}
	};

	putAxis = function( axis_data ){
		this.putAxisData( axis_data );
	};

	putAxisData = function( axis_data ){
		this.axes[ axis_data.id ] = axis_data;
	};

	putCardinality = function( cardinality ){
		this.putCardinalityData( cardinality );
	};

	putCardinalityData = function( cardinality_data ){
		this.cardinality = cardinality_data;
	};

	putOrigin = function( origin_data ){
		this.putOriginData( origin_data );
	};

	putOriginData = function( origin_data ){
		this.origin = origin_data;
	};
}
