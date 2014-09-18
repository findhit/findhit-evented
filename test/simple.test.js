var Evented = require('../index'),
	Process = require('findhit-process'),
	Util = require('findhit-util'),

	sinon = require('sinon'),
	chai = require('chai'),
	expect = chai.expect;

describe( "Evented", function () {

	beforeEach(function () {
		this.evt = new Evented();
	});

	describe( ".fire", function () {

		it( "fire an event", function () {
			var times = 0;

			this.evt.on( 'test', function () {

				times ++;

			});

			this.evt.fire( 'test' );

			expect( times ).to.be.equal( 1 );
		});

	});

	describe( ".on", function () {

		it( "run 3 times same events", function () {
			var times = 0;

			this.evt.on( 'test', function () {

				times ++;

			});

			this.evt.fire( 'test' );
			this.evt.fire( 'test' );
			this.evt.fire( 'test' );

			expect( times ).to.be.equal( 3 );
		});

		it( "run 3 times different events defined", function () {
			var times = 0;

			this.evt.on( 'test1 test2 test3', function () {

				times ++;

			});

			this.evt.fire( 'test1' );
			this.evt.fire( 'test2' );
			this.evt.fire( 'test3' );

			expect( times ).to.be.equal( 3 );
		});

		describe( "from $on prop", function () {
			
			it( "run 3 times same events", function () {
				var EventedProps = Evented.extend({
					$on: {
						test: function () {
							times ++;
						}
					},
				});

				this.evt = new EventedProps();

				var times = 0;

				this.evt.fire( 'test' );
				this.evt.fire( 'test' );
				this.evt.fire( 'test' );

				expect( times ).to.be.equal( 3 );
			});

		});

	});

	describe( ".once", function () {

		it( "run 1 time an event that is fired multiple times", function () {
			var times = 0;

			this.evt.once( 'test', function () {

				times ++;

			});

			this.evt.fire( 'test' );
			this.evt.fire( 'test' );
			this.evt.fire( 'test' );

			expect( times ).to.be.equal( 1 );
		});

		describe( "from $once prop", function () {
			
			it( "run 1 time an event that is fired multiple times", function () {
				var EventedProps = Evented.extend({
					$once: {
						test: function () {
							times ++;
						}
					},
				});

				this.evt = new EventedProps();

				var times = 0;

				this.evt.fire( 'test' );
				this.evt.fire( 'test' );
				this.evt.fire( 'test' );

				expect( times ).to.be.equal( 1 );
			});

		});

	});

});