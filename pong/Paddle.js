//=========================================================================//
//                              HTML5 Pong
//=========================================================================//
/**
 * @file Represents a paddle for the pong game.
 * @author Nick Manley
 * @copyright The Unlicense
 */
//-------------------------------------------------------------------------//

/** @namespace Pong */
var Pong = Pong || {};
 
/**
 * @class Paddle
 * @extends Pong.Rectangle
 * @param {object} context
 * @param {Pong.Configuration#leftPaddle | Pong.Configuration#rightPaddle}
 * paddleConfig
 */
Pong.Paddle = function(context, paddleConfig) {
    "use strict";
    // Define parent object and call its constructor.
    this.parent = Pong.Rectangle.prototype;
    this.parent.constructor.call(this, context);

    // Define the properties of the paddle.
    this.width = paddleConfig.width;
    this.height = paddleConfig.height;
    this.posX = paddleConfig.posX;
    this.posY = paddleConfig.posY;
    this.moveSpeed = paddleConfig.moveSpeed;
    this.color = paddleConfig.color;

    // Maintain the original position at instantiation.
    // This is used by the reset() method.
    this.origX = paddleConfig.posX;
    this.origY = paddleConfig.posY;
};
Pong.Paddle.prototype = new Pong.Rectangle(); // inheritance
Pong.Paddle.prototype.constructor = Pong.Paddle; // override constructor

/**
 * @summary Reset the paddle.
 * @description This method is used to reset the position of
 * the paddles after someone (player or computer AI) has scored.
 */
Pong.Paddle.prototype.reset = function() {
    "use strict";
    this.setPosition(this.origX, this.origY);
    this.setSpeed(0, 0);
};
