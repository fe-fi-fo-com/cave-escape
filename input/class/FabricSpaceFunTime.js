import{
	CLASS_DEFAULT_COORDINATE_SYSTEM,
	COORDINATE_SYSTEM_AXES_DEFAULT
} from '../shared/Constants.js'

import FabricSpaceTime from './FabricSpaceTime.js';

/**
 * spacefuntime is a drop-in replacement for spacetime_default.
 *
 * It's like the default type of spacetime, spacetime_default, but it has two more dimensions.
 *
 * Note: In spacetime_default one space (x, y, z) has one time ( t ).
 * That prevents simultaneous playback of one place and two or more times.
 *
 * In order to resolve that without trickery, we need at least one more dimension (u).
 *
 * If one space (x, y, z) has dimension u in phase and dimension t out of phrase,
 * then we may still view two different times in the same place, from the point of view of dimension u.
 * 
 * And if we're going to do that, then we'll need another dimension (v) to describe
 * what that interaction would look like. 
 *
 * This would bring the total to six (x, y, z, t, u, v).
 *
 * Question: How far up do you have to go before you start going sideways?
 * Answer: You can't, you'd need another dimension.
 *
 * Question: How far forward in time do you need to go before you begin to drift 
 * from the constraints of the past, present, and future?
 * Answer: You can't, you'd need another dimension.
 *
 * It's spacefuntime.
 */
export default class FabricSpaceFunTime extends FabricSpaceTime {
	constructor( constructor_data ){
		super();

		let coordinate_system = ( constructor_data?.coordinate_system || null );

		const dimension = 6;
		this,putDimension( dimension );

		if( !coordinate_system ){
			/**
			 * Note: We're going to change these and we need to copy the "constant,"
			 * lest it be changed.
			 */
			let axes_default = [ ...COORDINATE_SYSTEM_AXES_DEFAULT ];

			/** 
			* @todo check if type is cartesian
			*/
			axes_default.push( { id : 'u', name : 'u', ordinal : 4, scale : 1 } );
			axes_default.push( { id : 'v', name : 'v', ordinal : 5, scale : 1 } );

			coordinate_system = new CLASS_DEFAULT_COORDINATE_SYSTEM( axes_default );
			coordinate_system.putCardinality( dimension );
		}

		this.putCoordinateSystem( coordinate_system );
	}
}
