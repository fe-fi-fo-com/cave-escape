import MockServer from './MockServer.js';

export default class MockWebSocket{
	constructor( constructor_data ){
		const url = ( constructor_data?.url || null );
		const protocols = ( constructor_data?.protocols || null );

		this.event_listeners = {
			close : [],
			error : [],
			message : [],
			open : []
		};

		setTimeout( this.open.bind( this ), 0 );
	}

	open( url, protocols ){
		var event = new Event( 'open' );
		var server = this.getServer();

		this.dispatchEvent( event );
	};

	getServer(){
		return( new MockServer() );
	};

	send( request_data ){
		var server = this.getServer();
		var response = server.postRequest( request_data );

		var event = new Event( 'message' );
		event.response = response;
		this.dispatchEvent( event );

		setTimeout( function(){
			event = new Event( 'message' );
			event.response = '...delayed data.';
			this.dispatchEvent( event );
		}, 50 );
	};

	close(){
		var event = new Event( 'close' );
		this.dispatchEvent( event );
	};

	dispatchEvent( event ){
		var index = 0,
		length = this.event_listeners[ event.type ].length;

		for( ; index < length; index++ ){
			var event_listener = this.event_listeners[ event.type ][ index ];
			event_listener( event );
		}
	};

	addEventListener( event, callback ){
		this.event_listeners[ event ].push( callback );
	};
}
