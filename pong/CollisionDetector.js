//=========================================================================//
//                              HTML5 Pong
//=========================================================================//
/**
 * @file Detects collisions.
 * @author Nick Manley
 * @copyright The Unlicense
 */
//-------------------------------------------------------------------------//

/** @namespace Pong */
var Pong = Pong || {};

/** @enum Collision */
Pong.Collision = {
    NONE: "NONE",
    LEFT_EDGE: "LEFT_EDGE",
    TOP_EDGE: "TOP_EDGE",
    RIGHT_EDGE: "RIGHT_EDGE",
    BOTTOM_EDGE: "BOTTOM_EDGE",
    LEFT_PADDLE: "LEFT_PADDLE",
    RIGHT_PADDLE: "RIGHT_PADDLE"
};

/**
 * @class CollisionDetector
 * @param {object} context
 * @param {Pong.Paddle} leftPaddle
 * @param {Pong.Paddle} rightPaddle
 * @param {Pong.Ball} ball
 */
Pong.CollisionDetector = function(context, leftPaddle, rightPaddle, ball) {
    "use strict";
    this.context = context;
    this.leftPaddle = leftPaddle;
    this.rightPaddle = rightPaddle;
    this.ball = ball;
};

/** @returns {boolean} */
Pong.CollisionDetector.prototype.isBallAtLeftEdge = function() {
    "use strict";
    return this.ball.posX <= 0;
};

/** @returns {boolean} */
Pong.CollisionDetector.prototype.isBallAtRightEdge = function() {
    "use strict";
    return this.ball.posX + this.ball.width >= this.context.canvas.width;
};

/** @returns {boolean} */
Pong.CollisionDetector.prototype.isBallAtTopEdge = function() {
    "use strict";
    var ball = this.ball.posY;
    return ball <= 0;
};

/** @returns {boolean} */
Pong.CollisionDetector.prototype.isBallAtBottomEdge = function() {
    "use strict";
    var ball = this.ball.posY + this.ball.height;
    return ball >= this.context.canvas.height;
};

/**
 * @returns {Pong.Collision}
 */
Pong.CollisionDetector.prototype.detect = function() {
    "use strict";
    // First, check to see if the ball is out of bounds at any
    // of the edges.
    if (this.isBallAtLeftEdge()) { return Pong.Collision.LEFT_EDGE; }
    if (this.isBallAtRightEdge()) { return Pong.Collision.RIGHT_EDGE; }
    if (this.isBallAtTopEdge()) { return Pong.Collision.TOP_EDGE; }
    if (this.isBallAtBottomEdge()) { return Pong.Collision.BOTTOM_EDGE; }

    // At this point, we can assume that the ball is in bounds.
    // So check for a collision with the paddles.
    if (this.ball.isOverlapping(this.leftPaddle)) {
        return Pong.Collision.LEFT_PADDLE;
    }
    if (this.ball.isOverlapping(this.rightPaddle)) {
        return Pong.Collision.RIGHT_PADDLE;
    }

    // At this point, we can say that there is no collision.
    return Pong.Collision.NONE;
};
