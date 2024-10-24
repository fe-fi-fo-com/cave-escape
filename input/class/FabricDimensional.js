import FabricExistence from './FabricExistence.js';

/**
 * A type of existence that is dimensional
 *
 * @todo determine how this will be used because that will indicate the rest of
 * its implementation.
 */
export default class FabricDimensional extends FabricExistence{
	constructor(){
		super();

		this.dimension = null;
		this.coordinate_system = null;
	}

	/**
	 * Get the coordinate system for dimensional existence.
	 *
	 * @return int The number of coordinates needed to define a point
	 * @todo give Id and allow for multiple
	 */
	getCoordinateSystem = function(){
		return( this.getCoordinateSystemData() );
	};

	/**
	 * Get the coordinate system data for dimensional existence.
	 *
	 * @return int The number of coordinates needed to define a point
	 * @todo give Id and allow for multiple
	 */
	getCoordinateSystemData = function(){
		return( this.coordinate_system );
	};

	/**
	 * Get the number of dimensions (dimension) of existence.
	 * @return int The number of coordinates needed to fully define a point
	 */
	getDimension = function(){
		return( this.getDimensionData() );
	};

	/**
	 * Get the number of dimensions (dimension) of existence.
	 * @return int The number of coordinates needed to define a point
	 */
	getDimensionData = function(){
		return( this.dimension );
	};

	/**
	 * Set the coordinate system for dimensional existence.
	 *
	 * @return int The number of coordinates needed to define a point
	 * @todo give Id and allow for multiple
	 */
	putCoordinateSystem = function( coordinate_system ){
		return( this.putCoordinateSystemData( coordinate_system ) );
	};

	/**
	 * Set the coordinate system data for dimensional existence.
	 * @return int The number of coordinates needed to define a point
	 */
	putCoordinateSystemData = function( coordinate_system ){
		this.coordinate_system = coordinate_system;
	};

	/**
	 * Set the dimension of existence
	 * @var int dimension
	 */
	putDimension = function( dimension ){
		this.putDimensionData( dimension );
	};

	/**
	 * Set the dimension data of existence
	 * @var int dimension
	 */
	putDimensionData = function( dimension ){
		this.dimension = dimension;
	};
}
