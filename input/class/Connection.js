export default class Connection{
	constructor(){
		this.websocket = null;
	}

	deleteWebSocket( websocket ){
		this.websocket = null;
	};

	getError(){};

	getResponse(){
		var websocket = this.getWebSocket();
	};

	getWebSocket( websocket ){
		return( this.websocket );
	};

	postRequest( request_data ){
		var websocket = this.getWebSocket();
		websocket.send( request_data );
	};

	putClose(){
		var websocket = this.getWebSocket();
		websocket.close();
	};

	putConnectionEventClose( event ){
		console.log( 'event ' + event.type, event );
	};

	putConnectionEventError( event ){
		console.log( 'event ' + event.type, event );
	};

	putConnectionEventOpen( event ){
		console.log( 'event ' + event.type, event );
	};

	putConnectionEventMessage( event ){
		console.log( 'event ' + event.type, event );
	};

	putOpen( url, protocols ){
		const connection_data = {
			url : null,
			protocols : []
		};

		/*
		const websocket = new WebSocket( connection_data.url, connection_data.protocols );

		websocket.addEventListener( 'open', this.putConnectionEventOpen.bind( this ) );
		websocket.addEventListener( 'close', this.putConnectionEventClose.bind( this ) );
		websocket.addEventListener( 'error', this.putConnectionEventError.bind( this ) );
		websocket.addEventListener( 'message', this.putConnectionEventMessage.bind( this ) );

		this.putWebSocket( websocket );
		*/
	};

	putWebSocket( websocket ){
		this.websocket = websocket;
	};
}
