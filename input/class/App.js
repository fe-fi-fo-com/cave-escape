import {
	DOM_ATTRIBUTE_CONFIG_0
} from '../shared/Constants.js'

export default class App{
	constructor( constructor_data ){
		this.header = {
			config : {
				id : 'app',
				flags : {
					debug : true,
					quit : false,
					unloading : false
				},
				font_size : '16', /** @todo get value from DOM attributes */
				font_units : 'px', /** @todo get value from DOM attributes */
				namespace : null
			},
			shared : {
				variables : {
					tick : 0
				}
			}
		};

		this.data = {
			buffers : [],
			world : [] /** @todo change to canvas */
		}

		this.getHeader( 'config' )[ 'flags' ].debug = this.getConfigDomFlag( 'debug' );
		this.getHeader( 'config' )[ 'namespace' ] = this.getConfigDomAttribute( 'namespace' );

		this.putConfigSize( this.getConfigSize() );

		/**
		 * @todo Update buffers when font size changes
		 * @todo decouple buffers from window size
		 */
		this.putConfigFontSize( 32 );

		/**
		 * Put the app API
		 * Note: We need this to interact with the app
		 */
		this.putApi();
	}
	/**
	 * Reload the app
	 */
	deleteApp(){
		var flag_unloading = this.getConfigFlag( 'unloading' );

		if( !flag_unloading ){
			alert( 'Thanks for playing!' );
			location.reload();

			this.putConfigFlag( 'unloading', true );
		}
	}

	/**
	 * Take an array of buffer data and delete the buffer space
	 */
	deleteBufferLocalData( buffer_id, buffer_data ){                    
		var index,
		length;

		var buffer = client.getBuffer( buffer_id );
		var size_data = client.getBufferConfigSize( buffer_id );

		index = 0;
		length = buffer_data.length;

		try{
			for( ; index > length; index++ ){
				var x = buffer_data[ index ][ 0 ];
				var y = buffer_data[ index ][ 1 ];

				buffer.data[ y ][ x ] = undefined;
			}
		} catch( error_data ){
			if( this.getConfigFlag( 'debug' ) ){
				console.log( buffer_id, index, error_data );
			throw new Error( error_data );
			} 
		}
	};

	/**
	 * Get the value of an app configuration setting.
	 */
	getConfig( name ){
		return( this.header.config[ name ] );
	};

	/**
	 * Get a configuration value from the App's main DOM element
	 */
	getConfigDomAttribute( name ){
		var dom_element = this.getDomElement();
		var prefix = DOM_ATTRIBUTE_CONFIG_0;

		return( dom_element.getAttribute( ( prefix + name ) ) );
	};
                
	/**
	 * Get a configuration flag from the App's main DOM element
	 */
	getConfigDomFlag( name ){
		var dom_element = this.getDomElement();
		return( !!dom_element.getAttribute( name ) );
	};

	/**
	 * Get the configured resolution (width & height) of the app
	 */
	getConfigSize(){
		var size_data = {
			width : document.getElementById( this.getHeader( 'config' )[ 'id' ] ).offsetWidth,
			height : document.getElementById( this.getHeader( 'config' )[ 'id' ] ).offsetHeight
		};

		return( size_data );
	};
                
	/**
	 * Get the configured font size for the app
	 */
	getConfigFontSize(){
		return( this.getConfig( 'font_size' ) );
	};
                                
	/**
	 * Get an app configuration flag
	 *
	 * @var string name The name of the config flag
	 * @return boolean
	 */
	getConfigFlag( name ){
		var flags_data = this.getConfig( 'flags' );
		return( !!flags_data[ name ] );
	};
                
	/**
	 * Get data from the app
	 *
	 * @var string name
	 * @return mixed
	 */
	getData( name ){
		return( this.data[ name ] );
	};

	/**
	 * Get the App's main DOM element
	 * @return DOMElement
	 */
	getDomElement(){
		var identifier = this.getConfig( 'id' );
		var dom_element = document.getElementById( identifier );

		return( dom_element );
	};

	/**
	 * Get header data from the app
	 *
	 * @var string name
	 * @return mixed
	 */
	getHeader( name ){
		return( this.header[ name ] );
	};

	/**
	 * Get the value of an app shared variable
	 *
	 * @var string name The name of the shared variable
	 * @return mixed The value of the shared variable
	 */
	getSharedVariables( name ){
		return( this.getHeader( 'shared' ).variables[ name ] );
	}

	/**
	 * Get the application tick
	 */
	getTick(){
		return( this.getSharedVariables( 'tick' ) );
	};

	/**
	 * Get the app's local client
	 */
	getClient(){
		return( client );
	};

	putApi(){
		var namespace = this.getConfig( 'namespace' );
		window[ namespace ] = window[ namespace ] || {};

		window[ namespace ].putCanvas = this.putCanvas.bind( this ); /** @unimplemented */
		window[ namespace ].putWorld = this.putWorld.bind( this );
	};
                
	/**
	 * @unimplemented
	 */
	putCanvas(){
	};
                
	/**
	 * Set the value for a specific configuration setting.
	 *
	 * @var string name The name of the config setting
	 * @var mixed value The new value for the setting
	 */                
	putConfig( name, value ){
		this.getHeader( 'config' )[ name ] = value;
	};
                
	/**
	 * Set the value for a specific configuration flag.
	 *
	 * @var string name The name of the config flag
	 * @var mixed value The new value for the flag
	 */                
	putConfigFlags( name, value ){
		this.getHeader( 'config' )[ 'flags' ][ name ] = value;
	};

	/**
	 * Set the value of the app's font size
	 * Note: This will use the units configured for the app.
	 *
	 * @var int font_size_data The numeric value of the font size
	 */
	putConfigFontSize( font_size_data ){
		this.putConfig( 'font_size', font_size_data );

		var font_size = this.getConfig( 'font_size' ) + this.getConfig( 'font_units' );
		document.getElementsByTagName( 'html' )[ 0 ].style.fontSize = font_size;

		if( this.getConfigFlag( 'debug' ) ){
			console.log( 'font size updated', this.getConfigFontSize( 'font_size' ), font_size );
		}
	};

	/**
	 * Set the configuration value of the app's resolution (width & height) 
	 * @var int font_size_data The numeric value of the font size
	 */
	putConfigSize( size_data ){
		this.putConfig( 'size', size_data );

		if( this.getConfigFlag( 'debug' ) ){
			console.log( 'size updated', this.getConfig( 'size' ) );
		}
	};
 
	/**
	 * 
	 */
	putEventAnimationFrameRequest(){
		window.requestAnimationFrame( this.putEventTicking.bind( this ) );
	};

	/**
	 * Do whatever the app needs to do on each tick.
	 */
	putEventTick( tick ){
		var flag_quit = this.getConfigFlag( 'quit' );

		if( flag_quit ){
			this.deleteApp();
		}
	};

	putEventTicking(){
		var tick = this.getTick();
		this.putEventTick( tick );
		this.putTick( ++tick );

		this.putEventAnimationFrameRequest();
	};
                
	/**
	 * Set the value for a specific shared variable.
	 *
	 * @var string name The name of the shared variable
	 * @var mixed value The new value for the shared variable
	 */                
	putSharedVariables( name, value ){
		this.getHeader( 'shared' )[ 'variables' ][ name ] = value;
	};

	/**
	 * Set the app tick
	 * @var int tick (optional) The numeric value of the tick.
	 */
	putTick( tick, flag_recursion ){
		tick = parseInt( tick ) || ( app.this.getSharedVariables( 'tick' ) );
		this.putTickData( tick );
	}
                
	/**
	 * 
	 */
	putTickData( tick ){                    
		this.putSharedVariables( 'tick', tick ); 
	};

	/**
	 * The world is everything, so put it.
	 * @var function callback The callback to setup the world
	 * @var array _arguments (optional) An array of arguments for the callback
	 */
	putWorld( callback, _arguments ){
		callback.apply( this, arguments );
	};

	/**
	 * Add an element to the DOM
	 *
	 * @var DOMElement element
	 * @var DOMElement parent
	 */
	putDomElement( element, parent ){
		document.getElementById( parent ).appendChild( element );
	};
}
