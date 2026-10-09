import CoordinateSystem from './CoordinateSystem.js';

/**
 * A cartesian coordinate system for use with the fabric of N dimensional existence.
 * Note: The order of the coordinates is significant.
 */
export default class CoordinateSystemCartesian extends CoordinateSystem{
	constructor( constructor_data ){
		super();

		let axes_data = ( constructor_data?.axes_data || null );

		if( axes_data ){
			this.putAxes( axes_data );
		}
	}
}
