import FabricSpaceTimeDefault from '../class/FabricSpaceTimeDefault.js';
import CoordinateSystemCartesian from '../class/CoordinateSystemCartesian.js';

export const CLASS_DEFAULT_FABRIC = FabricSpaceTimeDefault;
export const CLASS_DEFAULT_COORDINATE_SYSTEM = CoordinateSystemCartesian;
export const COORDINATE_SYSTEM_AXES_DEFAULT = [
	{ id : 'x', name : 'x', ordinal : 0, scale : 1 },
	{ id : 'y', name : 'y', ordinal : 1, scale : 1 },
	{ id : 'z', name : 'z', ordinal : 2, scale : 1 },
	{ id : 't', name : 't', ordinal : 3, scale : 1 }
];

export const DOM_ATTRIBUTE_CONFIG_0 = 'app-config-';
export const DOM_CLASSNAME_BUFFER_0 = 'app-buffer';

export const SERVER_DEFAULT_0 = {
	id : null,
	slug : null,
	region : null
};
