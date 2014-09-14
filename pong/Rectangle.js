//=========================================================================//
//                              HTML5 Pong
//=========================================================================//
/**
 * @file Represents a rectangle for the pong game.
 * The rectangle is used for the paddles and for the ball (small square).
 * @author Nick Manley
 * @copyright The Unlicense
 */
//-------------------------------------------------------------------------//

/** @namespace Pong */
var Pong = Pong || {};

/** @class Rectangle */
Pong.Rectangle = function(context) {
    "use strict";
    /** Canvas context used for drawing/rendering. */
    this.context = context;

    /** Color of the rectangle. */
    this.color = "#FFF";

    /** Width of the rectangle in pixels. */
    this.width = 0;

    /** Height of the rectangle in pixels. */
    this.height = 0;

    /**
     * Position of the rectangle along the horizontal axis
     * based on the top-left corner of the rectangle.
     */
    this.posX = 0;

    /**
     * Position of the rectangle along the vertical axis
     * based on the top-left corner of the rectangle.
     */
    this.posY = 0;

    /**
     * How fast the rectangle moves along the horizontal axis
     * measured in pixels per second (pps).
     */
    this.speedX = 0;

    /**
     * How fast the rectangle moves along the vertical axis
     * measured in pixels per second (pps).
     */
    this.speedY = 0;

    /**
     * The time (in milliseconds) that has accumulated since
     * the rectangle has last moved along the horizontal axis
     * when speedX is non-zero.
     */
    this.accumTimeX = 0;

    /**
     * The time (in milliseconds) that has accumulated since
     * the rectangle has last moved along the vertical axis
     * when speedY is non-zero.
     */
    this.accumTimeY = 0;
};

/**
 * @summary Set the position of the rectangle.
 * @description By using this function to set the position,
 * it guarantees that the rectangle never extends beyond the viewable
 * area of the canvas.
 * The position is based on the top-left point of the rectangle.
 * @param {number} x - Horizontal coordinate.
 * @param {number} y - Vertical coordinate.
 */
Pong.Rectangle.prototype.setPosition = function(x, y) {
    "use strict";
    // These min/max variables represent the smallest/largest
    // position coordinates that the rectangle can take without
    // going outside of the viewable area.
    var minX = 0;
    var minY = 0;
    var maxX = this.context.canvas.width - this.width;
    var maxY = this.context.canvas.height - this.height;
    // Set posX.
    if (x < minX) { this.posX = minX; }
    else if (x > maxX) { this.posX = maxX; }
    else { this.posX = x; }
    // Set posY.
    if (y < minY) { this.posY = minY; }
    else if (y > maxY) { this.posY = maxY; }
    else { this.posY = y; }
};

/**
 * @summary Determine if this rectangle overlaps another.
 * @description
 * If you need help understanding how this works, see
 * the following StackOverflow page.
 * {@link http://stackoverflow.com/questions/306316/}
 * @param {Rectangle} other - The other rectangle to check against.
 */
Pong.Rectangle.prototype.isOverlapping = function(other) {
    "use strict";
    var coordinates = function(rect) {
        return {
            x1: rect.posX,
            y1: rect.posY,
            x2: rect.posX + rect.width,
            y2: rect.posY + rect.height
        };
    };
    var a = coordinates(this);
    var b = coordinates(other);

    return a.x1 <= b.x2 &&
           a.x2 >= b.x1 &&
           a.y1 <= b.y2 &&
           a.y2 >= b.y1;
};

/**
 * @param {number} x - Horizontal speed in pixels per second.
 * @param {number} y - Vertical speed in pixels per second.
 */
Pong.Rectangle.prototype.setSpeed = function(x, y) {
    "use strict";
    this.speedX = x;
    this.speedY = y;
};

/**
 * @summary Move the rectangle the specified number of pixels.
 * @description Move the rectangle the specified number of pixels.
 * This method is guaranteed to keep the rectangle within the bounds
 * of the canvas.
 * Positive numbers move down/right.
 * Negative numbers move up/left.
 * @param {number} x - Horizontal position.
 * @param {number} y - Vertical position.
 */
Pong.Rectangle.prototype.move = function(x, y) {
    "use strict";
    this.setPosition(this.posX + x, this.posY + y);
};

/**
 * @summary Compute the new position of the rectangle using the speed and
 * the time that has passed since the last update.
 * @param {number} timeDiff - Number of milliseconds that have passed
 * since the last update.
 */
Pong.Rectangle.prototype.update = function(timeDiff) {
    "use strict";
    // Accumulate the time (milliseconds) since the last
    // frame was rendered, but only if speed is non-zero.
    // Otherwise, time will accumulate while sitting still
    // and cause a big jump when it finally does move.
    this.accumTimeX += this.speedX !== 0 ? timeDiff : 0;
    this.accumTimeY += this.speedY !== 0 ? timeDiff : 0;
    // Determine the minimum number of milliseconds that
    // must pass before the object can even move by one pixel.
    // Javascript has "Infinity" so we can ignore the possible
    // divide-by-zero situation here.
    var minTimeX = Math.abs(1000 / this.speedX);
    var minTimeY = Math.abs(1000 / this.speedY);
    // If enough time has accumulated, move the object
    // the necessary number of pixels along the x-axis.
    if (this.accumTimeX >= minTimeX) {
        // Number of pixels to move and the sign (+/-) for direction.
        var x = parseInt(this.accumTimeX / (1000 / this.speedX));
        // Change the position.
        this.move(x, 0);
        // Reset the time accumulator.
        this.accumTimeX = 0;
    }
    // If enough time has accumulated, move the object
    // the necessary number of pixels along the y-axis.
    if (this.accumTimeY >= minTimeY) {
        // Number of pixels to move and the sign (+/-) for direction.
        var y = parseInt(this.accumTimeY / (1000 / this.speedY));
        // Change the position.
        this.move(0, y);
        // Reset the time accumulator.
        this.accumTimeY = 0;
    }
};

/** @summary Draw the rectangle to the canvas context. */
Pong.Rectangle.prototype.draw = function() {
    "use strict";
    this.context.fillStyle = this.color;
    this.context.fillRect(
        this.posX, this.posY,
        this.width, this.height);
};
