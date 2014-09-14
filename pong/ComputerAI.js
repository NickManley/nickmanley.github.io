//=========================================================================//
//                              HTML5 Pong
//=========================================================================//
/**
 * @file Artificial Intelligence (AI) for the computer (right paddle).
 * @author Nick Manley
 * @copyright The Unlicense
 */
//-------------------------------------------------------------------------//

/** @namespace Pong */
var Pong = Pong || {};

/**
 * @class ComputerAI
 * @param {Pong.Paddle} rightPaddle
 * @param {Pong.Ball} ball
 */
Pong.ComputerAI = function(rightPaddle, ball) {
    "use strict";
    this.rightPaddle = rightPaddle;
    this.ball = ball;
};

Pong.ComputerAI.prototype.followClosely = function() {
    "use strict";
    // The position of the middle of the paddle on the y-axis.
    var paddleY = this.rightPaddle.posY + (this.rightPaddle.height / 2);

    // The position of the middle of the ball on the y-axis.
    var ballY = this.ball.posY + (this.ball.height / 2);

    // Floating point value representing how far away the ball is
    // from the middle of the paddle.
    // (less than -1.0) => Ball is above the paddle.
    // (-1.0) => Ball is at the top edge of the paddle.
    // (0.0) => Ball and Paddle are perfectly aligned.
    // (1.0) => Ball is at the bottom edge of the paddle.
    // (greater than 1.0) => Ball is below the paddle.
    var offset = (ballY - paddleY) / (this.rightPaddle.height / 2);

    if (offset >= 1.0) {
        this.rightPaddle.setSpeed(0, this.rightPaddle.moveSpeed);
    } else if (offset <= -1.0) {
        this.rightPaddle.setSpeed(0, -(this.rightPaddle.moveSpeed));
    } else {
        // Move the paddle at a lower speed. This prevents a "jitter"
        // effect with the paddle movement and allows the paddle to
        // become more closely aligned with the ball by updating in
        // smaller increments.
        this.rightPaddle.setSpeed(0, this.rightPaddle.moveSpeed * offset);
    }
};

Pong.ComputerAI.prototype.followPerfectly = function() {
    "use strict";
    this.rightPaddle.posY = this.ball.posY - (this.rightPaddle.height / 2);
};

Pong.ComputerAI.prototype.update = function() {
    "use strict";
    this.followClosely();
};
