import {
	DOM_CLASSNAME_BUFFER_0
} from '../shared/Constants.js'

import { default as Connection } from './MockConnection.js';

export default class Client{
	constructor( app ){
		this.app = app;

		this.header = {
			config : {
				id : null
			},
			shared : {
				constructors : {}
			}
		};

		this.data = {
			buffers : [], /** @todo change to display buffers */
			connections : []
		};

		this.putConnection();
		let f = function(){
			this.putRequest( { header : { type : 'new-game' }, data : [1,2,3] } );
		};

		setTimeout( f.bind( this ), 0 );

		/**
		 * Put app events
		 */
		window.addEventListener( 'resize', this.putEventWindowResize.bind( this ) );
		window.addEventListener( 'keydown', this.putEventWindowKeydown.bind( this ) );
	}

	/**
	 * Delete the buffer
	 */
	deleteBufferData( buffer_id ){                    
		var index,
		length;

		var buffer = this.getBuffer( buffer_id ),
		buffer_data = ( buffer.data || [] );

		var size_data = this.getBufferConfigSize( buffer_id );
				
		index = 0,
		length = size_data.height;

		for( ; index < length; index++ ){
			var _index = 0,
			_length = size_data.width;

			buffer_data[ index ] = [];

			for( ; _index < _length; _index++ ){
				buffer_data[ index ].push( ' ' );
			}
		}

		buffer.data = buffer_data;
	};

	/**
	 * Get a buffer by it's identifier
	 */                
	getClientBuffer( buffer_id ){
		return( this.getData( 'buffers' )[ buffer_id ] );
	};

	/**
	 * Get the app's data buffers
	 */
	getClientBuffers(){
		return( this.getData( 'buffers' ) );
	};

	/**
	 * Get data from the client
	 *
	 * @var string name
	 * @return mixed
	 */
	getData( name ){
		return( this.data[ name ] );
	};

	/**
	 * Get the buffer by its identifier
	 */
	getBuffer( buffer_id ){
		return( this.getClientBuffer( buffer_id ) );
	};

	/**
	 * @todo decouple buffer from window size
	 */
	getBufferConfigSize(){                    
		var size_data = {
			height : this.app.getConfig( 'size' ).height,
			width : this.app.getConfig( 'size' ).width
		};

		var font_size = this.app.getConfigFontSize();

		size_data.height = Math.floor( size_data.height / font_size );
		size_data.width = Math.floor( size_data.width / font_size );

		return( size_data );
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
	 * Create an app buffer 
	 *
	 * @var string buffer_id The identifier for the buffer
	 * @var object buffer_data The data structure for the buffer
	 * @return object Return the app's data buffer
	 */
	putClientBuffer( buffer_id, buffer_data ){
		var buffers = this.getClientBuffers();

		buffers[ buffer_id ] = buffer_data;

		return( buffers[ buffer_id ] );
	};

	/**
	 * Callback function for window resize events
	 */
	putEventWindowResize( e ){
		e = e || window.event;

		this.app.putConfigSize( this.app.getSize() );
	};

	/**
	 * Callback function for window keydown events.
	 */
	putEventWindowKeydown( e ){
		e = e || window.event;

		var player = this.app.getData( 'world' )[ 0 ];
		var x = player.getX();
		var y = player.getY();

		var scenery_1 = this.app.getData( 'world' )[ 1 ];
		var scenery_2 = this.app.getData( 'world' )[ 2 ];

		var button_1 = this.app.getData( 'world' )[ 3 ];
		var item_large_stick_1 = this.app.getData( 'world' )[ 4 ];

		var message_good_job_1 = this.app.getData( 'world' )[ 5 ];

		let s1y = scenery_1.getY();
		let s2y = scenery_2.getY();

		let b1y = button_1.getY();
		let b1x = button_1.getX();

		if( player.getFlagIntersectingBoundingBoxes( [ scenery_1, scenery_2 ] ) ){ 
			player.flag_injured = true;
		} else {
			player.flag_injured = false;
		}

		switch( e.key ){
			case 'ArrowLeft':
				player.putXY( --x, y );
			break;

			case 'ArrowRight':
				if( player.flag_injured == false ){
					player.putXY( ++x, y );
				}

				if( player.getX() >= ( scenery_1.getWidth() - player.getWidth() ) ){
					message_good_job_1.flag_display = true;
					message_good_job_1.putXY( ( scenery_1.getWidth() - message_good_job_1.getWidth() ), ( scenery_1.getY() + 1 ) );
					//player.flag_happy = true;
				}
			break;

			case 'ArrowDown':
				if( player.flag_injured && ( player.getY() + player.getHeight() ) >= s2y ){
				} else {
					player.putXY( x, ++y );
				}
			break;

			case 'ArrowUp':
				if( player.flag_injured && player.getY() <= s1y ){
				} else {
					player.putXY( x, --y );
				}
			break;

			case 'Space':
			case ' ':
				if( player.flag_equip_large_stick_1 ){
					player.flag_equip_large_stick_1 = false;
					item_large_stick_1.flag_used = true;
					item_large_stick_1.putXY( player.getX() + ( player.getWidth() - 1 ), ( scenery_1.getY() + 1 ) );
				}
			break;

			case 'X':
			case 'x':
				this.app.putConfigFlags( 'quit', true );
			break;
		}

		if( true
		 && button_1.flag_pressed == false 
		 && player.getFlagIntersectingBoundingBoxes( [ button_1 ] )
		){
			player.flag_equip_large_stick_1 = true;
			button_1.flag_pressed = true;
		}

		if( !item_large_stick_1.flag_used ){
			scenery_1.putXY( 0, Math.floor( player.getX() / 4 ) );
			scenery_2.putXY( 0, 15 - Math.floor( player.getX() / 4 )  );
		}

		this.putBufferLocalData( 0, player.getBufferData() );
		this.putBufferLocalData( 1, scenery_1.getBufferData() );
		this.putBufferLocalData( 2, scenery_2.getBufferData() );
		this.putBufferLocalData( 3, button_1.getBufferData() );
		this.putBufferLocalData( 4, item_large_stick_1.getBufferData() );
		this.putBufferLocalData( 5, message_good_job_1.getBufferData() );

		this.putBufferDomData( 0 );
		this.putBufferDomData( 1 );
		this.putBufferDomData( 2 );
		this.putBufferDomData( 3 );
		this.putBufferDomData( 4 );
		this.putBufferDomData( 5 );
	};

	/**
	 * Create a new buffer
	 *
	 * @var int buffer_id An identifier for the buffer
	 * @var int zindex
	 * @var string slug A string identifier for the buffer
	 * @var object The data for the buffer
	 */
	putBuffer( buffer_id, zindex, slug, buffer_data ){
		buffer_id = parseInt( buffer_id );
		buffer_data = ( buffer_data || null );

		var dom_element = document.createElement( 'div' );
		dom_element.classList.add( DOM_CLASSNAME_BUFFER_0 );
		dom_element.id = slug;
		dom_element.style.zIndex = parseInt( zindex );

		/**
		* Add to the DOM
		*/
		this.app.putDomElement( dom_element, this.app.getHeader( 'config' )[ 'id' ] );

		/**
		* Initialize buffer data structure
		*/
		var app_buffer_data = {
			header : {
				config : {
				id : buffer_id,
					size : null /** Uninitialized */
				},
				dom_element : dom_element
			},
			data : buffer_data
		};
			    
		/**
		 * Add the buffer to the app
		 */
		this.putClientBuffer( buffer_id, app_buffer_data );

		/**
		 * Set the buffer's size
		 */
		this.putBufferConfigSize( buffer_id, this.getBufferConfigSize() );

		/**
		 * Initialize the buffer
		 */
		this.deleteBufferData( buffer_id );

		if( this.app.getConfigFlag( 'debug' ) ){
			console.log( 'putBUffer', this.getBuffer( buffer_id ) );
		}
	};

	/**
	 * Set the width and height of a buffer
	 * 
	 * @var int buffer_id The identifier for the buffer
	 * @var mixed size_data The width and height of the buffer
	 */
	putBufferConfigSize( buffer_id, size_data ){
		var buffer = this.getBuffer( buffer_id );
		buffer.header.config.size = size_data;
	};

	/**
	 * Write the data to the buffer
	 * @var mixed buffer_data
	 */
	putBufferData( buffer_data ){
		var buffer_id = buffer_data.header.id;
		var buffer = this.getBuffer( buffer_id );

		buffer.data = buffer_data.data;
	};

	/**
	 * Write the buffer data to the DOM element
	 * Note: This flushes the buffer data.
	 *
	 * @var int buffer_id The identifier for the buffer
	 */
	putBufferDomData( buffer_id ){
		var index,
		length;

		var buffer = this.getBuffer( buffer_id ),
		size_data = this.getBufferConfigSize( buffer_id );

		var buffer_data = '';

		index = 0;
		length = size_data.height;

		for( ; index < length; index++ ){                        
			var _index = 0,
			_length = buffer.data[ index ].length;

			buffer_data += buffer.data[ index ].join( '' ) + "\n";
		}
			
		buffer.header.dom_element.innerText = buffer_data;
	}

	/**
	 * Take an array of buffer data and add it to the buffer
	 */
	putBufferLocalData( buffer_id, buffer_data, flag_keep_buffer ){                    
		var index,
		length;

		var buffer = this.getBuffer( buffer_id );
		var size_data = this.getBufferConfigSize( buffer_id );

		if( !flag_keep_buffer ){
			this.deleteBufferData( buffer_id );
		}

		index = 0;
		length = buffer_data.length;

		if( this.app.getConfigFlag( 'debug' ) ){
			console.log( 'putting local buffer', buffer_id, buffer_data );
		}

		for( ; index < length; index++ ){
			var x = buffer_data[ index ][ 0 ];
			var y = buffer_data[ index ][ 1 ];
			var data = buffer_data[ index ][ 2 ];

			buffer.data[ y ][ x ] = data;
		}
	};
	
	getConnection(){
		return( this.data.connections[ 0 ] );
	};

	putRequest( request_data ){
		var connection = this.getConnection();

		connection.postRequest( request_data );
	};

	putConnection(){
		var connection = new Connection();
		connection.putOpen();

		this.putConnectionData( connection );
	};

	putConnectionData( connection ){
		this.data.connections.push( connection );
	};
}
