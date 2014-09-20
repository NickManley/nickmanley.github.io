//=========================================================================//
//                              HTML5 Pong
//=========================================================================//
/**
 * @file Represents the ball for the pong game.
 * @author Nick Manley
 * @copyright The Unlicense
 */
//-------------------------------------------------------------------------//

/** @namespace Pong */
var Pong = Pong || {};

/**
 * @class Ball
 * @extends Pong.Rectangle
 * @param {object} context
 * @param {Pong.Configuration#ball} ballConfig
 */
Pong.Ball = function(context, ballConfig) {
    "use strict";
    // Define parent object and call its constructor.
    this.parent = Pong.Rectangle.prototype;
    this.parent.constructor.call(this, context);

    // Define the properties of the ball.
    this.width = ballConfig.width;
    this.height = ballConfig.height;
    this.posX = ballConfig.posX;
    this.posY = ballConfig.posY;
    this.speedX = ballConfig.speedX;
    this.speedY = ballConfig.speedY;
    this.color = ballConfig.color;

    // Maintain the original position and speed at instantiation.
    // This is used by the reset() method.
    this.origPosX = ballConfig.posX;
    this.origPosY = ballConfig.posY;
    this.origSpeedX = ballConfig.speedX;
    this.origSpeedY = ballConfig.speedY;
};
Pong.Ball.prototype = new Pong.Rectangle(); // inheritance
Pong.Ball.prototype.constructor = Pong.Rectangle; // override constructor

/**
 * @summary Reset the ball.
 * @description This method is used to reset the speed and position of
 * the ball after someone (player or computer AI) has scored.
 */
Pong.Ball.prototype.reset = function() {
    "use strict";
    var randInt = function(min, max) {
        if (min > max) { throw "randInt: min > max"; }
        if (min == max) { return max; }
        return Math.floor((Math.random() * (max-min+1)) + min); 
    }

    this.setPosition(this.origPosX, this.origPosY);
    this.setSpeed(this.origSpeedX, randInt(-200, 200));
};

/**
 * @summary Calculate where the ball is in relation to the paddle
 * after a collision. 
 * @description The ball's vertical speed (speedY) should change
 * depending on where the ball hits the paddle. If the ball hits
 * the middle of the paddle, then it will be zero. If the ball
 * hits the upper part of the paddle, the ball should deflect upwards.
 * If the ball hits the lower part of the paddle, it should deflect
 * downwards.
 * This method calculates where the ball hit the paddle.
 * The result is returned as a positive or negative percentage
 * (-100 to +100). This is done so that the offset is a relative value
 * and not strongly tied to the height of the paddle. This way the paddle
 * height can be adjusted without throwing off this calculation.
 *
 * @param {Pong.Paddle} paddle
 */
Pong.Ball.prototype.calcPaddleOffset = function(paddle) {
    "use strict";
    var ballCenterY = this.posY + (this.height / 2);
    var paddleCenterY = paddle.posY + (paddle.height / 2);

    // The maximum distance (in pixels) away from the middle of
    // the paddle where the ball can still hit it.
    var maxDistance = paddle.height / 2;

    // The actual distance (in pixels) away from the middle of
    // the paddle where the ball did hit.
    var distance = ballCenterY - paddleCenterY;

    // Offset expressed in terms of percentage. This is used so
    // that this calculation function won't have to be modified
    // if the paddles are ever resized (bigger/smaller).
    return Math.round(distance / maxDistance * 100);
};

/**
 * @summary Deflect the ball off of a paddle.
 * @description Just reversing the direction of the ball isn't enough.
 * If that's all we do, then the ball is still overlapping the paddle
 * and another collision will be detected in the next update.
 * The solution is to move the ball so that it's just outside the paddle.
 * This method moves the ball 1 pixel to the left/right of the paddle
 * and then adjusts the speed.
 *
 * @param {Pong.Paddle} paddle
 */
Pong.Ball.prototype.deflectOffPaddle = function(paddle) {
    "use strict";
    // The paddle offset (percent) multiplied by some factor.
    // The higher the factor, the faster the bounce speed.
    var bounceSpeed = this.calcPaddleOffset(paddle) * 8;

    // Adjust the horizontal position of the ball so it no longer
    // overlaps and there is no duplicate collision detected in the
    // next update. We can determine which paddle is being hit
    // by looking at the direction (positive or negative speed) of the
    // ball.
    if (this.speedX < 0) {
        this.posX = paddle.posX + paddle.width + 1;
    } else if (this.speedX > 0) {
        this.posX = paddle.posX - this.width - 1;
    } else {
        throw "Cannot bounce ball with zero speed.";
    }

    // Deflect the ball.
    this.speedX = -(this.speedX);
    this.speedY = bounceSpeed;
};
