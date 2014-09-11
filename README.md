# Evented ![test-badge](http://strider.findhit.com/findhit/findhit-evented/badge)

javascript chained event emitter based on findhit-class

Instalation
-----------

```bash

	npm install findhit-evented --save

```

Usage
-----

```js

var Evented = require('findhit-evented');

var events = new Evented();
events.on('test', function () { console.log( arguments ); });
events.fire( 'test', { hello: 'world' } );

// OR

var Socket = new Evented({

		initialize: function ( host, port ) {

			this.host = host;
			this.port = port;

		},

		connect: function () {
			var self = this;

			/*
				... some I/O
			*/

			this.fire( 'connecting' );

			// Maybe async?
				self.fire( 'connected' );

			return this;
		},

	});

var socket = new Socket( 'localhost', 123456 );

socket
	.on( 'connecting', function () {
		console.log( 'Trying to connect...' );
	})
	.once( 'connected', function () {
		console.log( 'YUPI' );
	})
	.connect();

```
