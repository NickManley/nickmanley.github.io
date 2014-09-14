//=========================================================================//
//                              HTML5 Pong
//=========================================================================//
/**
 * @file The start screen for the pong game.
 * @author Nick Manley
 * @copyright The Unlicense
 */
//-------------------------------------------------------------------------//

/** @namespace Pong */
var Pong = Pong || {};

Pong.StartScreen = function(context) {
    "use strict";
    this.context = context;
};

Pong.StartScreen.prototype.drawTitle = function() {
    "use strict";
    this.context.font = "40px Arial";
    this.context.fillStyle = "#FFF";
    this.context.fillText("HTML5  Pong", 277, 100);
};

Pong.StartScreen.prototype.drawDevelopedBy = function() {
    "use strict";
    this.context.font = "16px Arial";
    this.context.fillStyle = "#FFF";
    this.context.fillText("Developed By: Nick Manley", 300, 140);
};

Pong.StartScreen.prototype.drawControls = function() {
    "use strict";
    this.context.font = "20px Arial";
    this.context.fillStyle = "#FFF";

    this.context.fillText("w", 290, 220);
    this.context.fillText("Move paddle up", 350, 220);
    this.context.fillText("s", 290, 250);
    this.context.fillText("Move paddle down", 350, 250);
    this.context.fillText("p", 290, 280);
    this.context.fillText("Pause/Resume game", 350, 280);

    this.context.font = "40px Arial";
    this.context.fillStyle = "#FFF";
    this.context.fillText("Press 'p' to Play", 258, 350);
};

Pong.StartScreen.prototype.drawGrid = function() {
    "use strict";
    this.context.fillRect(267, 0, 1, 600); // left third
    this.context.fillRect(334, 0, 1, 600);
    this.context.fillRect(400, 0, 1, 600); // center
    this.context.fillRect(467, 0, 1, 600);
    this.context.fillRect(533, 0, 1, 600); // right third
};

Pong.StartScreen.prototype.draw = function() {
    "use strict";
    this.drawTitle();
    this.drawDevelopedBy();
    this.drawControls();
};
