//=========================================================================//
//                              HTML5 Pong
//=========================================================================//
/**
 * @file The main game loop for the pong game.
 * @author Nick Manley
 * @copyright The Unlicense
 */
//-------------------------------------------------------------------------//

/** @namespace Pong */
var Pong = Pong || {};

/** @class Game */
Pong.Game = function(context) {
    "use strict";
    // Draw black background and assign context.
    context.canvas.style.background = "#000";
    this.context = context;

    // Create game objects.
    this.config = new Pong.Configuration();
    this.controls = this.config.controls;
    this.scoreboard = new Pong.Scoreboard(this.context,
                                          this.config.scoreboard);
    this.leftPaddle = new Pong.Paddle(this.context,
                                      this.config.leftPaddle);
    this.rightPaddle = new Pong.Paddle(this.context,
                                       this.config.rightPaddle);
    this.ball = new Pong.Ball(this.context, this.config.ball);
    this.collisionDetector = new Pong.CollisionDetector(
            this.context, this.leftPaddle, this.rightPaddle, this.ball);
    this.computerAI = new Pong.ComputerAI(this.rightPaddle, this.ball);
    this.isPaused = false;

    // Shim with fallback for requestAnimationFrame
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame       ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame    ||
               window.oRequestAnimationFrame      ||
               window.msRequestAnimationFrame     ||
               function(callback) {
                   window.setTimeout(callback, 1000 / 60);
               };
    })();
};

Pong.Game.prototype.clear = function() {
    "use strict";
    this.context.clearRect(0, 0,
            this.context.canvas.width,
            this.context.canvas.height);
};

Pong.Game.prototype.update = function(timeDiff) {
    "use strict";
    // Game Logic
    var collision = this.collisionDetector.detect();
    switch (collision) {
        case Pong.Collision.LEFT_PADDLE:
            this.ball.deflectOffPaddle(this.leftPaddle);
            break;
        case Pong.Collision.RIGHT_PADDLE:
            this.ball.deflectOffPaddle(this.rightPaddle);
            break;
        case Pong.Collision.BOTTOM_EDGE:
        case Pong.Collision.TOP_EDGE:
            this.ball.speedY = -(this.ball.speedY);
            break;
        case Pong.Collision.LEFT_EDGE:
            this.scoreboard.rightScore++;
            this.reset();
            break;
        case Pong.Collision.RIGHT_EDGE:
            this.scoreboard.leftScore++;
            this.reset();
            break;
        default: break;
    }

    this.computerAI.update();
    this.leftPaddle.update(timeDiff);
    this.rightPaddle.update(timeDiff);
    this.ball.update(timeDiff);
};

Pong.Game.prototype.draw = function() {
    "use strict";
    this.clear();
    this.scoreboard.draw();
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
};

Pong.Game.prototype.onKeyDown = function(event) {
    "use strict";
    var key = event.key || String.fromCharCode(event.which).toLowerCase();
    switch(key) {
        case this.controls.upKey:
            this.leftPaddle.speedY = -(this.leftPaddle.moveSpeed);
            break;
        case this.controls.downKey:
            this.leftPaddle.speedY = this.leftPaddle.moveSpeed;
            break;
        case this.controls.pauseKey:
            this.isPaused = this.isPaused ? false : true;
            break;
        case this.controls.resetKey:
            this.reset();
            break;
        default: break;
    }
};

Pong.Game.prototype.onKeyUp = function(event) {
    "use strict";
    var key = event.key || String.fromCharCode(event.which).toLowerCase();
    switch(key) {
        case this.controls.upKey:
        case this.controls.downKey:
            this.leftPaddle.speedY = 0;
            break;
        default: break;
    }
};

Pong.Game.prototype.reset = function() {
    "use strict";
    this.leftPaddle.reset();
    this.rightPaddle.reset();
    this.ball.reset();
};

Pong.Game.prototype.play = function() {
    "use strict";
    window.onkeydown = function(event) { self.onKeyDown(event); };
    window.onkeyup = function(event) { self.onKeyUp(event); };
    var currTime = performance.now();
    var prevTime = currTime;
    var diffTime = 0;
    var maxDelta = 1000 / 30;
    var self = this;
    (function animloop() {
        window.requestAnimFrame(animloop);
        currTime = performance.now();
        diffTime = currTime - prevTime;
        prevTime = currTime;
        if (self.isPaused) { return; }
        while (diffTime >= maxDelta) {
            self.update(maxDelta);
            diffTime -= maxDelta;
        }
        self.update(diffTime);
        self.draw();
    })();
};

Pong.Game.prototype.init = function() {
    "use strict";
    // Display start screen.
    var startScreen = new Pong.StartScreen(this.context);
    startScreen.draw();

    // Listen for "p" key to signal the start of the game.
    var self = this;
    window.onkeydown = function(event) {
        var key = event.key ||
                  String.fromCharCode(event.which).toLowerCase();
        if (key === "p") {
            self.play();
        }
    };
};
