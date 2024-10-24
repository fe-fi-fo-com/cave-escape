import {
	CLASS_DEFAULT_COORDINATE_SYSTEM,
	COORDINATE_SYSTEM_AXES_DEFAULT
} from './../shared/Constants';

import FabricSpaceTime from './FabricSpaceTime';

/**
 * The default type of spacetime. This is the kind that everyone thinks about. :\
 *
 * Note: In this spacetime one space (x, y, z) has one time ( t ).
 * This prevents simultaneous playback of one place and two or more times (without trickery).
 */
export default class FabricSpaceTimeDefault extends FabricSpaceTime{
	constructor( constructor_data ){
		super();

		let coordinate_system = ( constructor_data?.coordinate_system || null );

		const dimension = 4;
		this.putDimension( dimension );

		if( !coordinate_system ){
			coordinate_system = new CLASS_DEFAULT_COORDINATE_SYSTEM();
			coordinate_system.putCardinality( dimension );
			coordinate_system.putAxes( COORDINATE_SYSTEM_AXES_DEFAULT );
		}

		this.putCoordinateSystem( coordinate_system );
	}
}
