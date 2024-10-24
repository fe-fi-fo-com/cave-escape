import Connection from './Connection.js';
import MockWebSocket from './MockWebSocket.js';

export default class MockConnection extends Connection{
	constructor(){
		super();
	}

	putOpen(){
		const connection_data = {
			url : null,
			protocols : []
		};

		const websocket = new MockWebSocket( connection_data.url, connection_data.protocols );

		websocket.addEventListener( 'open', this.putConnectionEventOpen.bind( this ) );
		websocket.addEventListener( 'close', this.putConnectionEventClose.bind( this ) );
		websocket.addEventListener( 'error', this.putConnectionEventError.bind( this ) );
		websocket.addEventListener( 'message', this.putConnectionEventMessage.bind( this ) );

		this.putWebSocket( websocket );
	}
}
