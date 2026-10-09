export default class MockServer{
	postRequest( request_data ){
		var request = {
			header : {
				authentication : {},
				method : null,
				route : {
					controller : null,
					model : null,
					view : null
				}
			},
			data : {}
		};

		console.log( 'MockServer received request:', request_data );

		return( 'mock response' );
	}
}
