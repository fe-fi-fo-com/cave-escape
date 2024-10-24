import {
	CLASS_DEFAULT_FABRIC
} from './../shared/Constants';

/**
 * A canvas constitutes the entire domain of the app.
 * Note: Portions of the canvas may be viewed independently.
 */ 
export default class Canvas{
	constructor( constructor_data ){
		let fabric = ( constructor_data?.fabric || null ),
		coordinate_system = ( constructor_data?.coordinate_system || null );

		if( !fabric ){
			fabric = new CLASS_DEFAULT_FABRIC( coordinate_system );
		}

		this.putFabric( fabric );
	}

	/** 
	 * Get the fabric
	 * @return fabric
	 */
	getFabric = function(){
		return( this.getFabricData() );
	};

	/** 
	 * Get the fabric data
	 * @return fabric
	 */
	getFabricData = function(){
		return( this.fabric );
	};

	/**
	 * Set the fabric for the canvas
	 * @var coordinate_system
	 */
	putFabric = function( fabric ){
		this.putFabricData( fabric );
	};

	/**
	 * Set the fabric data for the canvas
	 * @var fabric fabric
	 */
	putFabricData = function( fabric_data ){
		this.fabric = fabric_data;
	};
}
