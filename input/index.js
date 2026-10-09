import App from './class/App.js';
import Client from './class/Client.js';
import Canvas from './class/Canvas.js';
import Player from './class/Player.js';
import Button1 from './class/Button1.js';
import Scenery1 from './class/Scenery1.js';
import Scenery2 from './class/Scenery2.js';
import ItemLargeStick1 from './class/ItemLargeStick1.js';
import MessageGoodJob1 from './class/MessageGoodJob1.js';

import './css/App.css';

/** Client side */
(function(){
	const app = new App();
	const client = new Client( app );
		
	app.putEventAnimationFrameRequest();

//lets_paint.putWorld( function(){
//	var app = this;
//	var client = app.getClient();

	var canvas = new Canvas();

	/**
	 * Initialize buffers
	 */
	client.putBuffer( 0, 100, 'player' );
	client.putBuffer( 1, 0, 'bg1' );
	client.putBuffer( 2, 0, 'bg2' );
	client.putBuffer( 3, 0, 'button_1' );
	client.putBuffer( 4, 0, 'item_large_stick_1' );
	client.putBuffer( 5, 0, 'message_good_job_1' );

	var a = new Player();
	app.getData( 'world' ).push( a );
	a.putXY( 0, 5 );

	var x = new Scenery1();
	app.getData( 'world' ).push( x );
	x.putXY( 0, Math.floor( a.getX()/4 ) );

	var y = new Scenery2();
	app.getData( 'world' ).push( y );
	y.putXY( 0, 15 - Math.floor( a.getX() / 4 ) );

	//set player y = ( x - y ) / 2 - player.height / 2?

	var z = new Button1();
	app.getData( 'world' ).push( z );
	z.putXY( 15, 5 );

	var i = new ItemLargeStick1( app );
	app.getData( 'world' ).push( i );
	i.putXY( 0, 0 );

	var g = new MessageGoodJob1();
	app.getData( 'world' ).push( g );
	g.putXY( 0, 0 );

	client.putBufferLocalData( 0, a.getBufferData() );
	client.putBufferLocalData( 1, x.getBufferData() );
	client.putBufferLocalData( 2, y.getBufferData() );
	client.putBufferLocalData( 3, z.getBufferData() );
	client.putBufferLocalData( 4, i.getBufferData() );
	client.putBufferLocalData( 5, g.getBufferData() );

	client.putBufferDomData( 0 );
	client.putBufferDomData( 1 );
	client.putBufferDomData( 2 );
	client.putBufferDomData( 3 );
	client.putBufferDomData( 4 );
	client.putBufferDomData( 5 );
//} );
}());
